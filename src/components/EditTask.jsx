import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

const EditTask = ({ data, editMode, tasks, setTasks, cateName, categories }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Pending");
  const [category, setCategory] = useState(cateName.name);
  useEffect(() => {
    setName(data.name);
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://trello-backend-api.herokuapp.com/updateTask/${data._id}`, {
        name,
        status,
        category: category,
      });

      editMode(false);
      const newTasks = tasks.map((task) => {
        if (task._id === data._id) {
          console.log(task);
          console.log(data);
          task.name = name;
          task.status = status;
          task.category = cateName.name;
          return task;
        } else {
          return task;
        }
      });
      setTasks(newTasks.filter((task) => task.category.name === cateName.name));
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
      <div>
        <label for="Category">Category </label>

        <select id="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      <button type="submit">Submit</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.category,
  };
};

export default connect(mapStateToProps)(EditTask);
