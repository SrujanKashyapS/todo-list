import React, { useState } from 'react';
import './App.css';

function App() {
  // State for the list of tasks
  const [tasks, setTasks] = useState([]);
  
  // State for the task description input
  const [description, setDescription] = useState('');
  
  // State to track the ID of the task being edited (if any)
  const [editingId, setEditingId] = useState(null);

  // Function to add a new task or update an existing one
  const addOrUpdateTask = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update an existing task
      let updatedTask = [];
      for(let task of tasks){
        if(task.id === editingId){
          task.description = description;
        }
        updatedTask.push(task);
      }
      setTasks(updatedTask);
      setEditingId(null);
    } else {
      // Add a new task with a unique ID and completed status
      const newTask = {
        id: Date.now(),
        description: description,
        completed: false
      };
      const newTasksArray = tasks.slice();
      newTasksArray.push(newTask);
      setTasks(newTasksArray);
    }
    // Reset the input field after adding or updating
    setDescription('');
  };

  // Function to delete a task by filtering it out
  const deleteTask = (id) => {
    let remainingTasks = [];
    for(let task of tasks){
      if(task.id != id) remainingTasks.push(task);
    }
    setTasks(remainingTasks);
  };

  // Function to toggle the completion status of a task
  const toggleComplete = (id) => {
    let toggledTasks=[];
    for(let task of tasks){
      if(task.id===id)
      {
        task.completed=!task.completed;
      }
      toggledTasks.push(task);
    }
    setTasks(toggledTasks);
  };

  // Function to start editing a task, pre-filling the input with the task description
  const startEditing = (task) => {
    setEditingId(task.id);
    setDescription(task.description);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <form onSubmit={addOrUpdateTask}>
        <input 
          type="text" 
          placeholder="Task Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <button type="submit">{editingId ? 'Update Task' : 'Add Task'}</button>
      </form>
      
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => toggleComplete(task.id)} 
            />
            <span>{task.description}</span>
            <button onClick={() => startEditing(task)} className="edit-button">Edit</button>
            <button onClick={() => deleteTask(task.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;