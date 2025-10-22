import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => {
        if (isMounted) setQuestions(data);
      });
    return () => (isMounted = false);
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" }).then(
      () => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
      }
    );
  }

  function handleAnswerChange(id, newIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((r) => r.json())
      .then((data) => {
        setQuestions((prev) => prev.map((q) => (q.id === id ? data : q)));
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((q) => (
          <QuestionItem
            key={q.id}
            question={q}
            onDelete={handleDelete}
            onAnswerChange={handleAnswerChange}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
