import React from 'react';

export function Square(props) {
  return (
    <button
      className={`square value-${props.value === null ? 'empty' : props.value}`}
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}
