import { calculateWinner } from './TicTacToeEngine';

describe('TicTacToeEngine', () => {
  it('calculats winner', () => {
    const winner = calculateWinner([
      'O', '', '',
      '', 'O', '',
      '', '', 'O',
    ]);
    expect(winner).toBe('O');
  });
  it('returns null if no winner', () => {
    const winner = calculateWinner([
      'X', 'O', 'X',
      'X', 'O', 'O',
      'O', 'X', 'O',
    ]);
    expect(winner).toBeNull();
  });
});