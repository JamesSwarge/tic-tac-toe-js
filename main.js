const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let cells = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;

function renderBoard() {
  board.innerHTML = '';
  cells.forEach((cell, i) => {
    const cellEl = document.createElement('div');
    cellEl.classList.add('cell');
    cellEl.textContent = cell;
    cellEl.addEventListener('click', () => handleClick(i));
    board.appendChild(cellEl);
  });
}

function handleClick(i) {
  if (cells[i] !== '' || gameOver) return;

  cells[i] = currentPlayer;
  renderBoard();
  if (checkWin()) {
    status.textContent = `${currentPlayer} wins!`;
    gameOver = true;
  } else if (cells.every(cell => cell !== '')) {
    status.textContent = "It's a draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6]  // Diagonals
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function resetGame() {
  cells = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  status.textContent = `${currentPlayer}'s turn`;
  renderBoard();
}

resetButton.addEventListener('click', resetGame);

resetGame(); // Initial render
