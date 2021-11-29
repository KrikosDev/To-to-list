import React, { useMemo } from 'react'
import { Checkbox, Paper } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import StarsIcon from '@material-ui/icons/Stars'
import { observer } from 'mobx-react-lite'
import { selectedTodos } from '../../store/Store'

export const Tasks = observer(
  ({ changeCheck, deleteTask, tasks, setFilterMeaning, filerState, setTasks }) => {
    const filerTasks = useMemo(
      () => setFilterMeaning(filerState),
      [tasks, filerState]
    )

      const setSelected = (id) => {
        const newTasks = tasks.map(item => {
          if (id === item._id) {
            item.selected = !item.selected
            return item
          } else {
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
                className={item.isDone ? 'task-p-checked' : 'task-p'}
                onDoubleClick={() =>
                  changeCheck(item.title, item.isDone, item._id)
                }
              >
                {item.title}
              </Paper>
              <StarsIcon
                className={item.selected ? 'selected-icon-active' : 'selected-icon'}
                alt='Пикчи нет'
                onClick={() => {
                  selectedTodos.addTodo(item)
                  setSelected(item._id)
                }}
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
