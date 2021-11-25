import React from 'react'
import { Container, MenuItem, Select } from "@material-ui/core";


export const Filter = ({ setFilterState, filterValue, filerState }) => (
  <Container className='filter-div'>
    <Select
    value={filerState}
    onChange={(e) => setFilterState(e.target.value)}>
      {filterValue.map((item, index) => (
        <MenuItem key={`filter-${index}`} value={item}>{item}</MenuItem>
      ))}
    </Select>
  </Container>
)