import React from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list'
import SearchPanel from '../search-panel'
import ItemStatusFilter from '../item-status-filter';

import './app.css';

const App = () => {
  const todoData = [
    { label: 'Learn something', important: false, id: 1 }, 
    { label: 'Create something', important: false, id: 2 }, 
    { label: 'Drink capuchino', important: true, id: 3 }];
  
  return (
    <div className="todo-app">
      <span className="date-info">{ (new Date()).toString() }</span>
      <AppHeader todo={1} done={3}/>
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter/>
      </div>
      <TodoList todos={todoData}/>
    </div>
  );
};

export default App;