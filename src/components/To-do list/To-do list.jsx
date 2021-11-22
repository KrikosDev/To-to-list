import React, { useState, useEffect } from 'react'
import deleteIcon from './img/deleteIcon.svg'
import './style.scss'

export const ToDoList = () => {
  const [taskText, setTaskText] = useState('')
  const [tasks, setTasks] = useState([])
  const [localTasks, setLocalTasks] = useState([])
  // console.log(localTasks);

  const createNewTask = () => {
    if (localTasks.length === 0 || localTasks === null) {
      const copyTasks = localTasks.concat()
      copyTasks.push({ text: taskText})
      setTasks(copyTasks)
      const strTask = JSON.stringify(tasks)
      localStorage.setItem('tasks', strTask)
      console.log(tasks);
      setTaskText('')
    } else {
      const copyTasks = localTasks.concat()
      copyTasks.push({ text: taskText})
      setTasks(copyTasks)
      const strTask = JSON.stringify(tasks)
      localStorage.setItem('tasks', strTask)
      // console.log(tasks);
      setTaskText('')
    }
  }

  const deleteTask = (item, ind) => {
    const updatedTasks = tasks.filter((value, index) => {
      return value !== item && ind !== index;
    })
    setTasks(updatedTasks)
    const strUpdatedTasks = JSON.stringify(tasks)
    localStorage.setItem('tasks', strUpdatedTasks)
  }

  useEffect(() => {
    const localTasks = localStorage.getItem('tasks');
    const localTasksParse = JSON.parse(localTasks);
    setLocalTasks(localTasksParse)
    // console.log(localTasksParse);
  }, [])

  useEffect(() => {
    const localTasks = localStorage.getItem('tasks');
    const localTasksParse = JSON.parse(localTasks);
    setLocalTasks(localTasksParse)
  }, [tasks])

  return (
    <div className='main-toDoList-div'>
      <h1>To-do list</h1>
      <div className='creation-string-div'>
        <input
          value={taskText}
          className='toDoList-input'
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button onClick={() => createNewTask()} className='add-task-button'>
          Add
        </button>
      </div>
      <div className='toDoList-tasks-div'>
        { (localTasks !== null && localTasks !== 0) && localTasks.map((item, index) => (
          <div className='tasks-div' key={`${index}-task-${Math.random()}`}>
            <p className='task-p'>{item.text}</p>
            <img
              src={deleteIcon}
              alt='Пикчи нет'
              className='deleteIcon'
              onClick={() => deleteTask(item, index)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
