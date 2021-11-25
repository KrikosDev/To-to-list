import React, { useMemo } from 'react'
import { Checkbox, Paper } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

export const Tasks = ({
  changeCheck,
  deleteTask,
  tasks,
  setFilterMeaning,
  filerState,
}) => {
  const filerTasks = useMemo(
    () => setFilterMeaning(filerState),
    [tasks, filerState]
  )

  return (
    <div className='to-do-list-tasks-div'>
      {tasks.lenght !== 0 &&
        filerTasks.map((item, index) => (
          <div className='tasks-div' key={`${index}-task-${Math.random()}`}>
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