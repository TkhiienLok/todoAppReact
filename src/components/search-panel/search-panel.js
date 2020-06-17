import React from 'react';

import './search-panel.css';

const SearchPanel = () => {
    const searchText = 'Type here to search';
  
    return <input 
      placeholder={searchText}
      className="search-input"/>;
  };

export default SearchPanel;