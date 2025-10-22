import React, { useState } from "react";

function QuestionItem({ question, onUpdateAnswer, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedIndex, setSelectedIndex] = useState(correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleChange = (e) => {
    const newIndex = parseInt(e.target.value);
    setSelectedIndex(newIndex);
    onUpdateAnswer?.(id, newIndex);
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedIndex} onChange={handleChange}>
          {options}
        </select>
      </label>
      <button onClick={() => onDelete?.(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
