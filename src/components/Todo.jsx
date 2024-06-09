import React, { useState } from "react";
import "./Todo.css";

// Task component to display individual tasks
const Task = ({ task, onDelete, onEdit, onStatusChange }) => {
  const [SelectedOption, setSelectedOption] = useState(task.status);

  const handleChange = (event) => {
    const newStatus = event.target.value;
    setSelectedOption(newStatus);
    onStatusChange(task.id, newStatus);
  };
  return (
    <div className="task-card col-3">
      <p>Name: {task.name}</p>
      <p>Description: {task.description}</p>
      <p>
        Status:
        <select
          value={SelectedOption} id="filer"
          onChange={handleChange}
          className={SelectedOption === "completed" ? "completed-option" : "not-completed-option"}
        >
          <option value="not completed">Not Completed</option>
          <option value="completed">Completed</option>
        </select>
      </p>
      <div className="task-buttons">
        <button onClick={() => onEdit(task.id)} className="btn btn-success">Edit</button>
        <button onClick={() => onDelete(task.id)} className="btn btn-warning">Delete</button>
      </div>
    </div>
  );
};

// Main Todo component
const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [filter, setFilter] = useState("both");

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      status: "not completed",
    };
    setTasks([...tasks, newTask]);
    setTaskName("");
    setTaskDescription("");
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setTaskName(task.name);
    setTaskDescription(task.description);
    deleteTask(taskId);
  };

  const changeTaskStatus = (taskId, status) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  const filteredTasks = tasks.filter(
    (task) => filter === "both" || task.status === filter
  );

  return (
    <div className="container">
      <h1 className="Todo">My todo</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <input
              type="text"
              placeholder="Todo Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <input
              type="text"
              placeholder="Todo Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <button onClick={addTask} className="btn btn-success">
              Add todo
            </button>
          </div>
        </div>
        <div className="filter d-flex justify-content-between">
            <h5>My Todos</h5>
            <section className="status">
          <label>Status Filter: </label>
          <select value={filter} className="filler" onChange={(e) => setFilter(e.target.value)}>
            <option value="both">All</option>;;
            <option value="not completed">Not Completed</option>
            <option value="completed">Completed</option>
          </select>
          </section>
        </div>
       
          <div className="task-list">
            {filteredTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onEdit={editTask}
                onStatusChange={changeTaskStatus}
              />
            ))}
          </div>
        </div>
      </div>
  
  );
};

export default Todo;
