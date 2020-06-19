import React from 'react';
import './item-add-form.css';

const ItemAddForm = ({ onItemAdded }) => {
  return (
    <div className="item-add-form">
      <button 
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => onItemAdded('New thing to do')}>
          Add Item
      </button>
    </div>
  );
}

export default ItemAddForm;