import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Tasks } from '../Tasks/Tasks'
import { Filter } from '../filter/Filter'
import { Button, Input, Typography } from '@material-ui/core'
import './style.scss'

export const ToDoList = () => {
  const url = 'https://exceed-todo-list.herokuapp.com/api/v1/todos'
  const [title, setTitle] = useState('')
  const [tasks, setTasks] = useState('')
  const [get, setGet] = useState([])
  const [filerState, setFilterState] = useState('Все')
  const filterValue = ['Все', 'Выполненные', 'Невыполненные']

  useEffect(async () => {
    await axios
      .get(`${url}`, {
        headers: { apikey: '952773f1-e82c-465f-acd6-5c282e3a2a99' },
      })
      .then((res) => {
        setTasks(res.data)
      })
      .catch((e) => {
        alert(`Ошибка ${e}`)
      })
  }, [get])

  const createNewTask = async () => {
    {
      await axios
        .post(
          `${url}`,
          {
            title,
            isDone: false,
          },
          { headers: { apikey: '952773f1-e82c-465f-acd6-5c282e3a2a99' } }
        )
        .then((res) => {
          setTitle('')
          setGet(res)
        })
        .catch((e) => {
          alert(`Ошибка ${e}`)
        })
    }
  }

  const deleteTask = async (item) => {
    await axios
      .delete(`${url}/${item._id}`, {
        headers: { apikey: '952773f1-e82c-465f-acd6-5c282e3a2a99' },
      })
      .then((res) => {
        setGet(res)
      })
      .catch((e) => {
        alert(`Ошибка ${e}`)
      })
  }

  const changeCheck = async (title, isDone, _id) => {
    await axios
      .put(
        `${url}/${_id}/done`,
        {
          isDone,
        },
        { headers: { apikey: '952773f1-e82c-465f-acd6-5c282e3a2a99' } }
      )
      .then((res) => {
        setGet(res)
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
      <div className='creation-string-div'>
        <Input
          value={title}
          className='to-do-list-input'
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              createNewTask()
            }
          }}
        />
        <Button onClick={() => createNewTask()} className='add-task-button'>
          Add
        </Button>
      </div>
      <Filter
        setFilterState={setFilterState}
        filterValue={filterValue}
        filerState={filerState}
      />
      <Tasks
        setFilterMeaning={setFilterMeaning}
        deleteTask={deleteTask}
        changeCheck={changeCheck}
        tasks={tasks}
        filerState={filerState}
      />
    </div>
  )
}
