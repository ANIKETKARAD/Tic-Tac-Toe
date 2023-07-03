let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const currentPlayerElement = document.getElementById('current-player');

function makeMove(cellIndex) {
  if (gameState[cellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  cells[cellIndex].textContent = currentPlayer;
  cells[cellIndex].classList.add(currentPlayer);

  if (checkWin()) {
    endGame(false);
  } else if (checkDraw()) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerElement.textContent = `Current player: ${currentPlayer}`;
  }
}

function checkWin() {
  for (let condition of winningConditions) {
    let [a, b, c] = condition;
    if (
      gameState[a] !== '' &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return !gameState.includes('');
}

function endGame(draw) {
  gameActive = false;
  let message = draw ? "It's a draw!" : `Player ${currentPlayer} wins!`;
  alert(message);
}

function restartBoard() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
  currentPlayerElement.textContent = `Current player: ${currentPlayer}`;
}
