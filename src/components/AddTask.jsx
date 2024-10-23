import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../Context/taskContext';

const AddTask = () => {
  const { 
    taskTitle, 
    setTaskTitle, 
    taskDescription, 
    setTaskDescription, 
    addTask, 
    cancelTask 
  } = useContext(TaskContext); // Destructure values from TaskContext
  
  const navigate = useNavigate();

  const handleAddTask = () => {
    addTask();  // Add task using context method
    navigate('/'); // Navigate back to home after adding the task
  };

  const handleCancelTask = () => {
    cancelTask();  // Clear inputs using context method
    navigate('/'); // Navigate back to home on cancel
  };



 

  return (
    <div className='parent-container'>
        <div className="add-task">
    <h2>Add Task</h2>
    <div className='task'>
      <input 
      placeholder='Task Title'
      value={taskTitle}
      onChange={(e) => setTaskTitle(e.target.value)}
     />

      <textarea
      placeholder='Task Description'
      value={taskDescription}
      onChange={(e) => setTaskDescription(e.target.value)}
      />
           </div>
           <div className="buttons">
           <button onClick={handleCancelTask}>Cancel</button>
           <button onClick={handleAddTask}>Add</button>
           </div>
     
     
    </div>
  </div>
  )
}

export default AddTask
