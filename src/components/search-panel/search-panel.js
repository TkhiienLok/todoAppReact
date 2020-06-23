import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.onSearchChange = (e) => {
      const searchText = e.target.value;
      this.setState({ searchText });
      this.props.onSearchChange(searchText);
    };
  }
  render() {
    const searchText = 'Type here to search';
    return <input 
      placeholder={searchText}
      className="search-input"
      onChange={this.onSearchChange}
      value={this.props.searchText}/>;
  }
};
