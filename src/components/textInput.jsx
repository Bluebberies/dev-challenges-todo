import React from "react";

const TextInput = ({ handleChange, input, addTask, handleKeyDown }) => {
  return (
    <div className="inputs">
      <input
        autoFocus
        name="task"
        placeholder="add details"
        onChange={handleChange}
        value={input}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button onClick={addTask}>Add</button>
    </div>
  );
};

export default TextInput;
