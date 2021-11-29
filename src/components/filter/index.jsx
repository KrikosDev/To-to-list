import React from 'react'
import { MenuItem, Select, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import './style.scss'

export const Filter = ({ setFilterState, filterValue, filerState }) => (
  <div className='filter-div'>
    <Select value={filerState} onChange={(e) => setFilterState(e.target.value)}>
      {filterValue.map((item) => (
        <MenuItem key={`filter-${item}`} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
    <Link to='/to-do-selected' className='link-selected'>
      <Button className='selected-task-button'>Selected</Button>
    </Link>
  </div>
)
