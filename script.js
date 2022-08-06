let state = {
  board: [],
  currentGame: [],
  savedGames: []
};

// INICIAR A APLICAÇÃO
function start() {
  createBoard();
  newGame();
}

// CRIAR O QUADRO COM OS 60 NÚMEROS
function createBoard() {
  state.board = [];
  for (let i = 1; i <= 60; i++) {
    state.board.push(i);
  }
}

// CRIAR UM NOVO JOGO
function newGame() {
  resetGame();
  render();
}

// RENDERIZAÇÃO DA PÁGINA
function render() {
  renderBoard();
}

function renderBoard() {
  divBoard = document.querySelector('#megasena-board');
  divBoard.innerHTML = '';
  let ulNumbers = document.createElement('ul');
  for (let i = 0; i < state.board.length; i++) {
    let currentNumber = state.board[i];
    let liNumber = document.createElement('li');
    liNumber.textContent = currentNumber;
    ulNumbers.appendChild(liNumber);
  }
  divBoard.appendChild(ulNumbers);
}

// ADICIONAR UM NÚMERO AO JOGO
function addNumberToGame(numberToAdd) {
  if (numberToAdd < 1 || numberToAdd > 60) {
    console.error('Número inválido', numberToAdd);
    return;
  }

  if (state.currentGame.length >= 6) {
    console.error('O jogo já está completo.');
    return;
  }

  if (isNumberInGame(numberToAdd)) {
    console.error('Este número já está no jogo.', numberToAdd);
    return;
  }

  state.currentGame.push(numberToAdd);
}

// REMOVER UM NÚMERO DO JOGO
function removeNumberFromGame(numberToRemove) {
  if (numberToRemove < 1 || numberToRemove > 60) {
    console.error('Número inválido', numberToRemove);
    return;
  }
  let newGame = [];
  for (let i = 0; i < state.currentGame.length; i++) {
    let currentNumber = state.currentGame[i];

    if (currentNumber === numberToRemove) {
      continue;
    }

    newGame.push(currentNumber);
  }

  state.currentGame = newGame;
}

// VERIFICAR SE JÁ EXITE O NÚMERO NO JOGO
function isNumberInGame(numberToCheck) {
  return state.currentGame.includes(numberToCheck);
}

// SALVAR O JOGO FEITO
function saveGame() {
  if (!isGameComplete()) {
    console.error('O jogo não está completo!');
    return;
  }

  state.savedGames.push(state.currentGame);
}

// VERIFICAR SE O JOGO ESTÁ COMPLETO
function isGameComplete() {
  return state.currentGame.length === 6;
}

// RESETAR O JOGO
function resetGame() {
  state.currentGame = [];
}

start();
