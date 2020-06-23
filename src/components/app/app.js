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
      ],
      searchTerm: '',
      currentFilter: 'active', // active, all, done
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

    this.search = (items, term) => {
      if (term.length === 0) {
        return items;
      }

      const filteredByTextItems =  items.filter((item) => {
        return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
      });

      if (!this.state.searchActiveOn) {
        return filteredByTextItems;
      }

      return  filteredByTextItems.filter(({done}) => !done);
    };

    this.onSearchChange = (term) => {
      this.setState({
        searchTerm: term
      });
    };

    this.filter = (items, term) => { 
      switch (term) {
        case 'all':
          return items;
        case 'active':
          return items.filter((item) => !item.done);
        case 'done':
          return items.filter((item) => item.done);
        default:
          return items;             
      }
    };

    this.changeFilter = (filterName) => {
      this.setState({
        currentFilter: filterName
      });
    };
  }

  render() {
    const { todoData, searchTerm, currentFilter } = this.state;

    const filteredItems = this.filter(this.search(todoData, searchTerm), currentFilter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <span className="date-info">{ (new Date()).toString() }</span>
        <AppHeader todo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter 
            filter={currentFilter}
            onFilterChange={this.changeFilter}/>
        </div>
        <TodoList 
          todos={filteredItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}/>
          <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
}
