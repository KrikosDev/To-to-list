import React from 'react'
import { MenuItem, Select, Button } from '@material-ui/core'
import './style.scss'
import { Link } from 'react-router-dom'

export const FilterSelected = ({ setFilterState, filterValue, filerState }) => (
  <div className='filter-div'>
    <Select value={filerState} onChange={(e) => setFilterState(e.target.value)}>
      {filterValue.map((item, index) => (
        <MenuItem key={`filter-${index}`} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
    <Link to='/to-do-list' className='link-selected'>
      <Button className='selected-task-button'>All tasks</Button>
    </Link>
  </div>
)
