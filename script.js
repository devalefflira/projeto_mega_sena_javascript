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
  console.log(state.currentGame);
}

// RENDERIZAÇÃO DA PÁGINA
function render() {
  renderBoard();
  renderButtons();
  renderSavedGames();
}

function renderBoard() {
  divBoard = document.querySelector('#megasena-board');
  divBoard.innerHTML = '';

  let ulNumbers = document.createElement('ul');
  ulNumbers.classList.add('numbers');

  for (let i = 0; i < state.board.length; i++) {
    let currentNumber = state.board[i];
    let liNumber = document.createElement('li');

    liNumber.textContent = currentNumber;
    liNumber.addEventListener('click', handleNumberClick);
    ulNumbers.appendChild(liNumber);
  }
  divBoard.appendChild(ulNumbers);
}

function handleNumberClick(event) {
  let value = Number(event.currentTarget.textContent);
  if (isNumberInGame(value)) {
    removeNumberFromGame(value);
  } else {
    addNumberToGame(value);
  }
  console.log(state.currentGame);
}

// RENDERIZAR O BOTÃO
function renderButtons() {
  let divButtons = document.querySelector('#megasena-buttons');
  divButtons.innerHTML = '';
  let buttonNewGame = createNewGameButton();
  let buttonRandomGame = createRandomGameButton();
  let buttonSaveGame = createSaveGameButton();
  divButtons.appendChild(buttonNewGame);
  divButtons.appendChild(buttonRandomGame);
  divButtons.appendChild(buttonSaveGame);
}

// CRIAR O BOTÃO DE NOVO JOGO
function createNewGameButton() {
  let button = document.createElement('button');
  button.textContent = 'Novo Jogo';
  button.addEventListener('click', newGame);
  return button;
}

// CRIAR O BOTÃO DE JOGO ALEATÓRIO
function createRandomGameButton() {
  let button = document.createElement('button');
  button.textContent = 'Jogo Aleatório';
  button.addEventListener('click', randomGame);
  return button;
}

// CRIAR O BOTÃO DE SALVAR O JOGO
function createSaveGameButton() {
  let button = document.createElement('button');
  button.textContent = 'Salvar Jogo';
  button.addEventListener('click', saveGame);
  return button;
}

function renderSavedGames() {}

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
  newGame();
  console.log(state.currentGame);
}

// VERIFICAR SE O JOGO ESTÁ COMPLETO
function isGameComplete() {
  return state.currentGame.length === 6;
}

// RESETAR O JOGO
function resetGame() {
  state.currentGame = [];
}

// CRIAR JOGO ALEATÓRIO
function randomGame() {
  resetGame();

  while (!isGameComplete()) {
    let randomNumber = Math.ceil(Math.random() * 60);
    addNumberToGame(randomNumber);
  }
  console.log(state.currentGame);
}

start();
