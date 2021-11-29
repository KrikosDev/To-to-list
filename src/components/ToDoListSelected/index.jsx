import React, { useState, useEffect } from 'react'
import { TasksSelected } from '../TasksSelected'
import { FilterSelected } from '../FilterSelected'
import { Typography } from '@material-ui/core'
import style from './style.module.scss'
import axios from 'axios'
import { selectedTodos } from '../../store/Store'

export const ToDoListSelected = () => {
  const url = 'https://exceed-todo-list.herokuapp.com/api/v1/todos'
  const [tasks, setTasks] = useState([])
  const [filerState, setFilterState] = useState('Все')
  const filterValue = ['Все', 'Выполненные', 'Невыполненные']

  useEffect(() => {
    setTasks(selectedTodos.todos)
  }, [])

  const deleteTask = async (item) => {
    await axios
      .delete(`${url}/${item._id}`, {
        headers: { apikey: '952773f1-e82c-465f-acd6-5c282e3a2a99' },
      })
      .then((res) => {
      })
      .catch((e) => {
        alert(`Ошибка ${e}`)
      })
  }

  const changeCheck = async (isDone, _id) => {
    await axios
      .put(
        `${url}/${_id}/done`,
        {
          isDone,
        },
        { headers: { apikey: '952773f1-e82c-465f-acd6-5c282e3a2a99' } }
      )
      .then((res) => {
      })
      .catch((e) => {
        alert(`Ошибка ${e}`)
      })
  }

  const setFilterMeaning = (valueFiltering) => {
    let filteringTasks = [...tasks]

    if (valueFiltering === 'Выполненные') {
      return filteringTasks.filter((item) => {
        if (item.isDone) {
          return item
        }
      })
    } else if (valueFiltering === 'Невыполненные') {
      return filteringTasks.filter((item) => {
        if (!item.isDone) {
          return item
        }
      })
    }
    return filteringTasks
  }

  return (
    <div className='main-to-do-list-div'>
      <Typography variant='h1'>To-do list</Typography>
      <Typography className={style.h3} variant='h3'>Selected</Typography>
      <div className='creation-string-div'>
      </div>
      <FilterSelected
        setFilterState={setFilterState}
        filterValue={filterValue}
        filerState={filerState}
      />
      <TasksSelected
        setFilterMeaning={setFilterMeaning}
        tasks={tasks}
        filerState={filerState}
        deleteTask={deleteTask}
        changeCheck={changeCheck}
        setTasks={setTasks}
      />
    </div>
  )
}