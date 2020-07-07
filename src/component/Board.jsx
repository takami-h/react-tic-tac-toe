import React from 'react';
import { Square } from './Square';

export function Board(props) {
  /*
   * 0 1 2
   * 3 4 5
   * 6 7 8
   */
  return (
    <div>
      {[0, 1, 2].map(row => {
        return (
          <div className="board-row">
            {[0, 1, 2].map(col => {
              const index = row*3 + col;
              return (
                <Square
                  value={props.squares[index]}
                  onClick={() => props.onClick(index)} />
              );
            })}
          </div>
        )
      })}
    </div>
  );
}
