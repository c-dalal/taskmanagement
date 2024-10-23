import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { TaskContext } from '../Context/taskContext';

const EditTask = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const { taskId } = useParams();  // Extract task ID from URL
  const navigate = useNavigate();  // To redirect after editing
  const [task, setTask] = useState(null);  // Store the current task details.


  const statusOptions = ["Pending", "In Progress", "Completed"];

  // Fetch the task to be edited by its ID
  useEffect(() => {
    const taskToEdit = tasks.find(t => t.id === parseInt(taskId));
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskId, tasks]);

  // Handle task update
  const handleUpdate = () => {
    setTasks(prevTasks => 
      prevTasks.map(t => t.id === parseInt(taskId) ? task : t)
    );
    navigate("/");  // Redirect to home after update
  };

  if (!task) {
    return <div>Loading...</div>;
  }

// Handle task cancel
const handleCancel = () => {
  navigate("/");
}

  return (
    <div className='parent-container'>
      <div className="edit-task">
         <h2>Edit Task</h2>
      <div className='edit-tasks'>
     
        <input
         type="text"
         value={task.title}
         onChange={(e) => setTask({ ...task, title: e.target.value })}
        />

      <br />
      

        <textarea
        type='text'
         value={task.description}
         onChange={(e) => setTask({ ...task, description: e.target.value })}
        />


        {/* state of task */}
        <select
        className='update-state'
        value={task.state}
        onChange={(e) => setTask({ ...task, state: e.target.value })}
      >
        {statusOptions.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>



      
      </div>
        <div className="buttons">

      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleUpdate} >Update</button>
      </div>

      </div>
    </div>
  )
}

export default EditTask
