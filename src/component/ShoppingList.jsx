import React from 'react';

export function ShoppingList(props) {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {props.name} ({props.items.length} items)</h1>
        <ul>
          {props.items.map((item) => {
            return <li>{item}</li>;
          })}
        </ul>
      </div>
    );
}
