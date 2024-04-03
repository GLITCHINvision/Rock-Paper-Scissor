const winScore = document.getElementById("win_score");
const loseScore = document.getElementById("lose_score");
const tieScore = document.getElementById("tie_score");
const userIcon = document.getElementById("user-icon");
const computerIcon = document.getElementById("computer-icon");
const resultSec = document.getElementById("result-section");

// Get score from localStorage or from default value.
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

let icon = {
  rock: '&#9994;',
  paper: '&#9995;',
  scissor: '&#9996;'
};

// Add event click to reset button and run scoreReset function.
document.querySelector('.js-score-reset-button')
  .addEventListener('click', () => {
    scoreReset();
  });

// Add event click to 'rock, paper, scissor' button. 
document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });
document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });
document.querySelector('.js-scissor-button')
  .addEventListener('click', () => {
    playGame('scissor');
  });

// Create a function playGame and compare playerMover and computerMove to get the result.
function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

// Get result to compare playerMove and computerMove. 
  if (playerMove === 'rock') {
    userIcon.innerHTML = icon.rock;
    computerMove === 'rock' ? result = 'tie'
      : computerMove === 'paper' ? result = 'you lose'
        : result = 'you win';
  } else if (playerMove === 'paper') {
    userIcon.innerHTML = icon.paper;
    computerMove === 'paper' ? result = 'tie'
      : computerMove === 'rock' ? result = 'you win'
        : result = 'you lose';
  } else {
    userIcon.innerHTML = icon.scissor;
    computerMove === 'scissor' ? result = 'tie'
      : computerMove === 'rock' ? result = 'you lose'
        : result = 'you win';
  }

  // Increase score on result. 
  result === 'you win'
    ? winScore.innerHTML = ++score.wins
    : result === 'you lose'
      ? loseScore.innerHTML = ++score.losses
      : tieScore.innerHTML = ++score.ties;
  
// Set localStorage 
  localStorage.setItem('score', JSON.stringify(score));

// Display result.
  result === 'you win' || 'you lose' || 'tie'
    ? resultSec.innerHTML = result.toUpperCase() + ' !' : '';
  
// Set hand animation to 'none' after game on. 
  'rock' || 'paper' || 'scissor' === playerMove
    ? userIcon.style.animation = "none" : '';
};

// Display score on re-render of the page. 
function displayScore() {
  winScore.innerHTML = score.wins;
  loseScore.innerHTML = score.losses
  tieScore.innerHTML = score.ties;
};
displayScore();

// Set computer move using random number.
function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  }
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  }
  else {
    computerMove = 'scissor';
  }

// Set computer move icon based on its move.
  computerMove === 'rock'
    ? computerIcon.innerHTML = icon.rock
    : computerMove === 'paper'
      ? computerIcon.innerHTML = icon.paper
      : computerIcon.innerHTML = icon.scissor;

// Set hand animation to 'none' after game on.
  'paper' || 'rock' || 'scissor' === computerMove
    ? computerIcon.style.animation = "none" : '';

  return computerMove;
}

// Create a function to reset score, icon and animation;
function scoreReset() {
  localStorage.removeItem('score');
  winScore.innerHTML = score.wins = 0;
  loseScore.innerHTML = score.losses = 0;
  tieScore.innerHTML = score.ties = 0;
  resultSec.innerHTML = 'v/s';
  userIcon.innerHTML = icon.rock;
  computerIcon.innerHTML = icon.rock;
  userIcon.style.animation = "clashHand 0.4s ease-in-out infinite";
  computerIcon.style.animation = "clashHand2 0.4s ease-in-out infinite";
};
