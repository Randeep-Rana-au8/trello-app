import React, { useState, useEffect } from "react";
import Input from "./Input";
import "./Category.css";
import axios from "axios";
import EditTask from "./EditTask";
import { connect } from "react-redux";
import { delete_category } from "../redux/actions/allActions";

const Category = ({ cateName, delete_category }) => {
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get("https://trello-backend-api.herokuapp.com/tasks");
      setTasks(res.data.filter((task) => task.category === cateName.name));
    };

    fetchTasks();
  }, [tasks]);

  const handleDeleteCategory = (data) => {
    const deleteCate = async () => {
      const res = await axios.delete(`https://trello-backend-api.herokuapp.com/deleteCategory/${data._id}`);
    };
    deleteCate();
    // delete_category(data);
  };

  const getData = (data) => {
    const category = cateName.name;
    const addTasks = async () => {
      const res = await axios.post("https://trello-backend-api.herokuapp.com/addtask", { ...data, category });
    };
    addTasks();
    // setTasks([...tasks, data]);
  };

  const handleDeleteTask = (data) => {
    const deleteTask = async () => {
      const res = await axios.delete(`https://trello-backend-api.herokuapp.com/deleteTask/${data._id}`);
    };
    deleteTask();
    const newTasks = tasks.filter((task) => task._id != data._id);
    // setTasks(newTasks);
  };

  const handleEditTask = (data) => {
    setEditMode(true);
    setEditData(data);
  };

  return (
    <div className="category">
      <div>
        <div className="category-container-header">
          <h1>{cateName.name}</h1>
          <div onClick={(e) => handleDeleteCategory(cateName)} className="trash-icon">
            <i className="fas fa-trash"></i>
          </div>
        </div>
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

export default connect(null, { delete_category })(Category);
