import React, { useState } from "react";

const Input = ({ sendData, placeholder }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Pending");
  const [addMode, setAddMode] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    const allData = {
      name,
      status,
    };
    sendData(allData);
    setName("");
    setStatus("Pending");
    setAddMode(false);
  };

  return (
    <div>
      {addMode ? (
        <form onSubmit={handleClick}>
          <input
            required
            placeholder={placeholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <div>
            <label for="status">Status </label>

            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="InProgress">InProgress</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Rejected">Rejected</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <button onClick={(e) => setAddMode(true)}>Add Task </button>
      )}
    </div>
  );
};

export default Input;
