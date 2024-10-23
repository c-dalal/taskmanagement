import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../Context/taskContext";

const Home = () => {
  const { tasks, activeTab, setActiveTab } = useContext(TaskContext);
  const[searchQuery,setSearchQuery] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filteredTasks = tasks
    .filter(task => task.state === (activeTab === 'inProgress' ? 'In Progress' : activeTab === 'completed' ? 'Completed' : 'Pending'))
    .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())); 

  return (
    <div className="parent-container">
      <div className="todo-container">
        <h2>TO-DO APP</h2>
        {/* search todos */}
        <div className="search-container">
          <i className="fa fa-search"></i>
          <input 
          type="text" 
          placeholder="Search To-Do"  
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="tabs">
          {/* In progress */}
          <div
            onClick={() => handleTabClick("inProgress")}
            className={activeTab === "inProgress" ? "active-tab" : ""}
          >
            In Progress (
            {tasks.filter((task) => task.state === "In Progress").length})
          </div>
          {/* Pending */}
          <div
            onClick={() => handleTabClick("pending")}
            className={activeTab === "pending" ? "active-tab" : ""}
          >
            Pending ({tasks.filter((task) => task.state === "Pending").length})
          </div>
          {/* Completed */}
          <div
            onClick={() => handleTabClick("completed")}
            className={activeTab === "completed" ? "active-tab" : ""}
          >
            Completed (
            {tasks.filter((task) => task.state === "Completed").length})
          </div>
        </div>

        {/* <div className="task-list">
          {tasks
            .filter(
              (task) =>
                task.state ===
                (activeTab === "inProgress" ? "In Progress" : "Completed")
            )
            .map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
        </div> */}

        {/* Display filtered task list */}
        <div className="task-list">
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

      </div>
    </div>
  );
};

const TaskItem = ({ task }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleUpdateChange = () => {
    navigate(`/edit/${task.id}`);
  };

  const handleDelete = () => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
  };
  return (
    <div
      className="task-item"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="task-title">{task.title}</div>
      <div className="task-desc">{task.description}</div>
      <div className="task-date">{task.date}</div>
      <div className="task-date">{task.state}</div>
      {hover && (
        <div className="task-actions">
          <button className="update-btn" onClick={handleUpdateChange}>
            Update
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
