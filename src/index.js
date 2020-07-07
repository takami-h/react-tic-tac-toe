import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ShoppingList } from './component/ShoppingList';
import {calculateWinner} from './TicTacToeEngine';

function Square(props) {
  return (
    <button
      className={`square value-${props.value === null ? 'empty' : props.value}`}
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props) {
  const renderSquare = (i) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)} />
    );
  }
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    // stepNumber以降の手を切り捨てることで、時間を巻き戻す
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step %2) === 0,
    });
  }

  render() {
    const itemsToBuy = ['Instagram', 'WhatsApp', 'Oculus', 'Parse'];

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const status = winner
          ? `Winner: ${winner}`
          : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : `Go to game start`;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    return (
      <main>
        <h1 className="game-title">Tic Tac Toe</h1>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
        <ShoppingList name="John Doe" items={itemsToBuy} />
      </main>
    );
  }
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
