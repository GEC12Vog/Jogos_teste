let winsX = 0;
let winsO = 0;

const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status');
const restartBtn = document.querySelector('#restart');
const placarRestartBtn = document.querySelector('#placar-restart');
// Seleção dos elementos das pontuações
const scoreXText = document.querySelector('#score-x');
const scoreOText = document.querySelector('#score-o');

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

cells.forEach(cell => cell.addEventListener('click', cellClicked));
restartBtn.addEventListener('click', restartGame);

cells.forEach(cell => cell.addEventListener('click', cellClicked));
placarRestartBtn.addEventListener('click', restartPlacar);
cells.forEach(cell => cell.addEventListener('click', cellClicked));
placarRestartBtn.addEventListener('click', restartGame);

function cellClicked() {
  const cellIndex = this.getAttribute('data-index');

  if (options[cellIndex] !== "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = (currentPlayer === "X") ? "O" : "X";
  statusText.textContent = `Vez do jogador: ${currentPlayer}`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `O jogador (${currentPlayer}) foi o vencedor!`;
    running = false;
    
    // Incrementa a variável e atualiza a tela
    if (currentPlayer === "X") {
      winsX++;
      scoreXText.textContent = `Pontos do jogador X: ${winsX}`;
    } else {
      winsO++;
      scoreOText.textContent = `Pontos do Jogador O: ${winsO}`;
    }

  } else if (!options.includes("")) {
    statusText.textContent = `Empate! Ninguém venceu.`;
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Vez do jogador: ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = "");
  running = true;
}

function restartPlacar(){
  winsO = 0
  winsX = 0
  scoreXText.textContent = `Pontos do jogador X: ${winsX}`;
  scoreOText.textContent = `Pontos do Jogador O: ${winsO}`; 
}