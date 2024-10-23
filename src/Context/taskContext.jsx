import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
export const TaskContext = createContext();

// Create the provider component
export const TaskProvider = ({ children }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('inProgress'); // Add activeTab state
  const navigate = useNavigate();

 // Load tasks from localStorage on component mount
 useEffect(() => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    setTasks(JSON.parse(storedTasks));
  }
}, []);

// Save tasks to localStorage whenever they change
useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      date: new Date().toLocaleString(),
      state: 'In Progress',
    };

    setTasks([...tasks, newTask]);

    // Clear inputs
    setTaskTitle('');
    setTaskDescription('');
  };

  const cancelTask = () => {
    setTaskTitle('');
    setTaskDescription('');
    navigate('/')
  };

  return (
    <TaskContext.Provider
      value={{
        taskTitle,
        setTaskTitle,
        taskDescription,
        setTaskDescription,
        tasks,
        setTasks,
        addTask,
        cancelTask,
        activeTab,      // Provide activeTab state
        setActiveTab,   // Provide function to update activeTab
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
