// import functions and grab DOM elements
import { renderGame } from './render-utils.js';
const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');

const nameForm = document.getElementById('name-form');
const nameFormButton = document.getElementById('name-form-button');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');
const finishGameButton = document.getElementById('finish-game-button');
const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');

// create an array to hold on to the state of past games
const pastGames = [];

let currentGame = {
    name1: '',
    name2: '',
    score1: 0,
    score2: 0
};

nameFormButton.addEventListener('click', (e) => {
    e.preventDefault();

    const formData = new FormData(nameFormButton);

    const name1 = formData.get ('team-one');
    const name2 = formData.get ('team-two');

    currentGame.name1 = name1;
    currentGame.name2 = name2;

    nameForm.reset();
    refreshCurrentGameEl();
});


teamOneAddButton.addEventListener('click', () => {
    currentGame.score1++;

    refreshCurrentGameEl();
    
});

teamTwoAddButton.addEventListener('click', () => {
    currentGame.score2++;

    refreshCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    currentGame.score1--;

    refreshCurrentGameEl();
});

teamTwoSubtractButton.addEventListener('click', () => {
    currentGame.score2--;

    refreshCurrentGameEl();
});


finishGameButton.addEventListener('click', () => {

    pastGames.push(currentGame);

    displayAllGames();

    currentGame = {
        name1: '',
        name2: '',
        score1: 0,
        score2: 0
    };

    refreshCurrentGameEl();
});

function refreshCurrentGameEl() {
    currentGameEl.textContent = '';

    teamOneLabel.textContent = currentGame.name1;
    teamTwoLabel.textContent = currentGame.name2;

    const gameEl = renderGame(currentGame);

    gameEl.classList.add('current');

    currentGameEl.append(gameEl);
}


function displayAllGames() {
    pastGamesEl.textContent = '';

    for (let game of pastGames) {
        const gameEl = renderGame(game);

        gameEl.classList.add('past');
    
        pastGamesEl.append(gameEl);
    }
}

