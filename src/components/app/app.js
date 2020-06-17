import React, { Component } from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list'
import SearchPanel from '../search-panel'
import ItemStatusFilter from '../item-status-filter';

import './app.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todoData: [
        { label: 'Learn something', important: false, id: 1 }, 
        { label: 'Create something', important: false, id: 2 }, 
        { label: 'Drink capuchino', important: true, id: 3 }
      ]
    }
    this.deleteItem = (id) => {
      this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const newtodoArray = [
          ...todoData.slice(0, idx), 
          ...todoData.slice(idx + 1)
        ];
        return {
          todoData: newtodoArray
        };
      });
    }
  }
  render() {
    return (
      <div className="todo-app">
        <span className="date-info">{ (new Date()).toString() }</span>
        <AppHeader todo={1} done={3}/>
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter/>
        </div>
        <TodoList 
          todos={this.state.todoData}
          onDeleted={this.deleteItem}/>
      </div>
    );
  }
}
