import React from 'react';

export function ShoppingList(props) {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {props.name} ({props.items.length} items)</h1>
        <ul>
          {props.items.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
    );
}
