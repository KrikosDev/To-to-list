import React, { useMemo } from 'react'
import { Checkbox, Paper } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import StarsIcon from '@material-ui/icons/Stars'
import { selectedTodos } from '../../store/Store'
import { observer } from 'mobx-react-lite'
import './style.scss'
import { values } from 'mobx'

export const TasksSelected = observer(
  ({
    changeCheck,
    deleteTask,
    tasks,
    setFilterMeaning,
    filerState,
    setTasks,
  }) => {
    const filerTasks = useMemo(
      () => setFilterMeaning(filerState),
      [tasks, filerState]
    )

    const deleteSelectedTask = (item) => {
      selectedTodos.deleteTodo(item)

      const newTasks = tasks.filter((value) => {
        if (value._id !== item._id) {
          return item
        }
      })

      setTasks(newTasks)
    }

    return (
      <div className='to-do-list-tasks-div'>
        {tasks.lenght !== 0 &&
          filerTasks.map((item) => (
            <div className='tasks-div' key={`task-${item._id}`}>
              <Checkbox
                type='checkbox'
                checked={item.isDone}
                onChange={() => changeCheck(item.text, item.isCheck, item._id)}
              />
              <Paper
                className={item.checked ? 'task-p-checked' : 'task-p'}
                onDoubleClick={() =>
                  changeCheck(item.title, item.isDone, item._id)
                }
              >
                {item.title}
              </Paper>
              <StarsIcon
                className='selected-icon-active'
                alt='Пикчи нет'
                onClick={() => deleteSelectedTask(item)}
              />
              <DeleteIcon
                className='delete-icon'
                onClick={() => deleteTask(item)}
                alt='Пикчи нет'
              />
            </div>
          ))}
      </div>
    )
  }
)
