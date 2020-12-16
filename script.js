'use strict';
// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;


let scores, currentScore, activePlayer, playing;
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  playing = true;
  diceEL.classList.add('hidden');
 scores = [0, 0];
 currentScore = 0;
 activePlayer = 0;
};
init();

const switchPlayer = function() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}
// rolling
btnRoll.addEventListener('click', function() {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // check if rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
  switchPlayer();
    }
  }

});

btnHold.addEventListener('click', function() {
  if (playing) {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  if (scores[activePlayer] >= 50) {
    playing = false;
    diceEL.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

  } else {
    switchPlayer();
  }
}
});

// reset game
btnNew.addEventListener('click', init);
