import React, { useState, useEffect } from "react";
import axios from "axios";

const EditTask = ({ data, editMode, tasks, setTasks, cateName }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Pending");
  //   const [category, setCategory] = useState("TODO");
  useEffect(() => {
    setName(data.name);
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://trello-backend-api.herokuapp.com/updateTask/${data._id}`, {
        name,
        status,
        category: cateName,
      });

      editMode(false);
      const newTasks = tasks.map((task) => {
        if (task._id === data._id) {
          task.name = name;
          task.status = status;
          task.category = cateName;
          return task;
        } else {
          return task;
        }
      });
      setTasks(newTasks.filter((task) => task.category === cateName));
    } catch (Err) {
      console.log(Err.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    editMode(false);
  };

  return (
    <form onSubmit={handleClick}>
      <input required value={name} onChange={(e) => setName(e.target.value)} type="text" />
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
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default EditTask;
