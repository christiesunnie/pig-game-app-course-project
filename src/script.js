import img1 from 'url:./images/dice-1.png';
import img2 from 'url:./images/dice-2.png';
import img3 from 'url:./images/dice-3.png';
import img4 from 'url:./images/dice-4.png';
import img5 from 'url:./images/dice-5.png';
import img6 from 'url:./images/dice-6.png';

const currScore0El = document.getElementById('current--0');
const currScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currScore0El.textContent = 0;
  currScore1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

rollBtn.addEventListener('click', function () {
  if (playing) {
    //generating a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `${
      dice === 1
        ? img1
        : dice === 2
        ? img2
        : dice === 3
        ? img3
        : dice === 4
        ? img4
        : dice === 5
        ? img5
        : img6
    }`;

    // check for rolled 1
    if (dice !== 1) {
      // add to the current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      // switch to the new player
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', init);
