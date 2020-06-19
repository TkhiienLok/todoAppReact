import React, { Component } from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list'
import SearchPanel from '../search-panel'
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
  constructor() {
    super();
    this.maxId = 0;

    this.createTodoItem = (label) => {
      return { 
        label: label, 
        important: false,
        done: false,
        id: this.maxId++,
      }
    };

    this.state = {
      todoData: [
        this.createTodoItem('Learn something'),
        this.createTodoItem('Create something'),
        this.createTodoItem('Drink capuchino'),
      ]
    };

    this.deleteItem = (id) => {
      this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const newTodoArray = [
          ...todoData.slice(0, idx), 
          ...todoData.slice(idx + 1)
        ];
        return {
          todoData: newTodoArray
        };
      });
    };

    this.addItem = (text) => {
      this.setState(({ todoData }) => {
        const newTodoArray = [
          ...todoData, 
          this.createTodoItem(text)
        ];
        return {
          todoData: newTodoArray
        };
      });
    };

    this.toggleProperty = (arr, id, propName) => {
      const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = {
        ...oldItem,
        [propName]: !oldItem[propName]
      };

      const newArray = [
          ...arr.slice(0, idx), 
          newItem,
          ...arr.slice(idx + 1)
      ];
      return newArray;
    };

    this.onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        const newTodoArray = this.toggleProperty(todoData, id, 'important');
        return {
          todoData: newTodoArray
        };
      });
    };

    this.onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        const newTodoArray = this.toggleProperty(todoData, id, 'done');
        return {
          todoData: newTodoArray
        };
      });
    };
  }

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <span className="date-info">{ (new Date()).toString() }</span>
        <AppHeader todo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter/>
        </div>
        <ItemAddForm onItemAdded={this.addItem}/>
        <TodoList 
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}/>
      </div>
    );
  }
}
