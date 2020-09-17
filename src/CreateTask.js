import React, { useState } from 'react';
import './CreateTask.css'

function CreateTask({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;

      addTask(value);
      setValue("");
  }

  return (
      <form onSubmit={handleSubmit}>
          <input
              type="text"
              className="input"
              value={value}
              placeholder="Add your task here..."
              onChange={e => setValue(e.target.value)}
          />
          <button>Add</button>
      </form>
  );
}

export default CreateTask
