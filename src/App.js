import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (taskDescription && taskCategory) {
      const newTask = {
        description: taskDescription,
        category: taskCategory,
        isCompleted: false,
      };

      if (editIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = newTask;
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, newTask]);
      }

      setTaskDescription('');
      setTaskCategory('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const markTaskComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setTaskDescription(tasks[index].description);
    setTaskCategory(tasks[index].category);
    setEditIndex(index);
  };

  const completedTasksCount = tasks.filter((task) => task.isCompleted).length;

  return (
    <div className="App">
      <h1>To Do List</h1>

      <div className="task-form">
        <input
          type="text"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={taskCategory}
          onChange={(e) => setTaskCategory(e.target.value)}
        />
        <button onClick={addTask}>{editIndex !== null ? 'Update Task' : 'Add Task'}</button>
      </div>

      <div className="tasks">
        {tasks.map((task, index) => (
          <div key={index} className="task">
            <div
              className="task-details"
              style={{
                textDecoration: task.isCompleted ? 'line-through' : 'none',
                color: task.isCompleted ? 'red' : 'black',
              }}
            >
              <h3>{task.description}</h3>
              <p>Category: {task.category}</p>
            </div>
            <div className="task-actions">
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => markTaskComplete(index)}
              />
              <button onClick={() => editTask(index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="task-count">
        <h3>Total Completed Tasks: {completedTasksCount}</h3>
      </div>
    </div>
  );
}

export default App;
