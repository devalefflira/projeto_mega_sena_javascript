let state = {
  board: [],
  currentGame: [],
  savedGames: []
};

// Inicia a aplicação
function start() {
  createBoard();
  newGame();
}

// Cria o quadro ou canvas com 60 números
function createBoard() {
  state.board = [];
  for (let i = 1; i <= 60; i++) {
    state.board.push(i);
  }
}

// Cria um novo jogo
function newGame() {
  resetGame();
  render();
  console.log(state.currentGame);
}

// Renderização na página
function render() {
  renderBoard();
  renderButtons();
  renderSavedGames();
}

// Renderização da lista de números no canvas
function renderBoard() {
  divBoard = document.querySelector('#megasena-board');
  divBoard.innerHTML = '';

  let ulNumbers = document.createElement('ul');
  ulNumbers.classList.add('numbers');

  for (let i = 0; i < state.board.length; i++) {
    let currentNumber = state.board[i];

    let liNumber = document.createElement('li');
    liNumber.textContent = currentNumber;
    liNumber.classList.add('number');
    liNumber.addEventListener('click', handleNumberClick);

    if (isNumberInGame(currentNumber)) {
      liNumber.classList.add('selected-number');
    }
    ulNumbers.appendChild(liNumber);
  }
  divBoard.appendChild(ulNumbers);
}

// Evento que escuta o clique no número escolhido
function handleNumberClick(event) {
  let value = Number(event.currentTarget.textContent);
  if (isNumberInGame(value)) {
    removeNumberFromGame(value);
  } else {
    addNumberToGame(value);
  }
  console.log(state.currentGame);
  render();
}

// Renderiza na tela os botões
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

// Cria o botão de Novo Jogo
function createNewGameButton() {
  let button = document.createElement('button');
  button.textContent = 'Novo Jogo';
  button.addEventListener('click', newGame);
  return button;
}

// Cria o botão de Jogo Aleatório
function createRandomGameButton() {
  let button = document.createElement('button');
  button.textContent = 'Jogo Aleatório';
  button.addEventListener('click', randomGame);
  return button;
}

// Cria o botão de Salvar Jogo
function createSaveGameButton() {
  let button = document.createElement('button');
  button.textContent = 'Salvar Jogo';
  // desabilita o botão "Salvar Jogo" enquanto o jogo não está completo
  button.disabled = !isGameComplete();
  button.addEventListener('click', saveGame);
  return button;
}

// Renderiza na tela os jogos salvos
function renderSavedGames() {
  let divSavedGames = document.querySelector('#megasena-saved-games');
  divSavedGames.innerHTML = '';

  if (state.savedGames.length === 0) {
    divSavedGames.innerHTML = '<p>Nenhum Jogo Salvo</p>';
  } else {
    let ulSavedGames = document.createElement('ul');

    for (let i = 0; i < state.savedGames.length; i++) {
      let currentGame = state.savedGames[i];

      let liGame = document.createElement('li');
      liGame.textContent = currentGame.join(', ');

      ulSavedGames.appendChild(liGame);
    }
    divSavedGames.appendChild(ulSavedGames);
  }
}

// Adiciona um número ao jogo
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

// Remove um número do jogo
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

// Verifica se já existe o número clicado ou escolhido no jogo
function isNumberInGame(numberToCheck) {
  return state.currentGame.includes(numberToCheck);
}

// Salva o jogo escolhido ou gerado aleatoriamente
function saveGame() {
  if (!isGameComplete()) {
    console.error('O jogo não está completo!');
    return;
  }

  state.savedGames.push(state.currentGame);
  newGame();
  console.log(state.currentGame);
}

// Verifica se o jogo está completo
function isGameComplete() {
  return state.currentGame.length === 6;
}

// Reseta ou reinicia o jogo
function resetGame() {
  state.currentGame = [];
}

// Cria um jogo aleatório
function randomGame() {
  resetGame();

  while (!isGameComplete()) {
    let randomNumber = Math.ceil(Math.random() * 60);
    addNumberToGame(randomNumber);
  }
  console.log(state.currentGame);
  render();
}
// Chama a função que faz a aplicação funcionar
start();
