
import React from 'react';
import './App.css'
import { ToDoList } from './components/ToDoList/ToDoList'
import { ToDoListSelected } from './components/ToDoListSelected/ToDoListSelected';          

import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/to-do-list' component={ToDoList}/>
        <Route path='/to-do-selected' component={ToDoListSelected}/>
        <Redirect to='/to-do-list' />
      </Switch>
    </div>
  )
}

export default App
