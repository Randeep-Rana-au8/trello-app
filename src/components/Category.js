import React, { useState, useEffect } from "react";
import Input from "./Input";
import "./Category.css";
import axios from "axios";
import EditTask from "./EditTask";

const Category = ({ cateName }) => {
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get("https://trello-backend-api.herokuapp.com/tasks");
      setTasks(res.data.filter((task) => task.category === cateName));
    };

    fetchTasks();
  }, []);

  const getData = (data) => {
    const category = cateName;
    const addTasks = async () => {
      const res = await axios.post("https://trello-backend-api.herokuapp.com/addtask", { ...data, category });
    };
    addTasks();
    setTasks([...tasks, data]);
  };

  const handleDeleteTask = (data) => {
    const deleteTask = async () => {
      const res = await axios.delete(`https://trello-backend-api.herokuapp.com/deleteTask/${data._id}`);
    };
    deleteTask();
    const newTasks = tasks.filter((task) => task._id != data._id);
    setTasks(newTasks);
  };

  const handleEditTask = (data) => {
    setEditMode(true);
    setEditData(data);
  };

  return (
    <div className="category">
      <div>
        <h1>{cateName}</h1>
        {tasks.map((task) => (
          <div className="abc" key={task._id}>
            <div className="taskData">
              <h5>{task.name}</h5>
              <div className="allIcons">
                <div onClick={(e) => handleEditTask(task)} className="edit-icon">
                  <i className="fas fa-edit"></i>
                </div>
                <div onClick={(e) => handleDeleteTask(task)} className="trash-icon">
                  <i className="fas fa-trash"></i>
                </div>
              </div>
            </div>
            <span style={{ fontSize: "10px", textAlign: "end" }}>{task.status}</span>
          </div>
        ))}
      </div>
      {editMode ? (
        <EditTask data={editData} editMode={setEditMode} tasks={tasks} cateName={cateName} setTasks={setTasks} />
      ) : (
        <div className="taskInput">
          <Input placeholder={"Create New Task"} sendData={getData} />
        </div>
      )}
    </div>
  );
};

export default Category;
