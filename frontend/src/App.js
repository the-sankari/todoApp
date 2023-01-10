import React from 'react';
import './App.css';
// import png from './image/logo.png'
import logo from './logo.svg'
import TodoList from './components/TodoList';
import TaskList from './components/TaskList';
function App() {
  return (
    <>
  <div className='header' >
 
  <img src={logo} className="App-logo" alt="logo" />
  </div>

    <div className='todo-app'>
      <TodoList />
      <TaskList/>
    <div className='footer'>
      <p>@projectteam1-2022</p>
    </div>
    </div>
    </>
  );
}

export default App;
