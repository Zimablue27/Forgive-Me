const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const message = document.getElementById('message');

let score = 0;
let timeLeft = 30;
let gameActive = true;

const messages = [
  "I'm sorry 😔",
  "I messed up 😭",
  "Too slow 😭",
  "You deserve better 💛",
  "Please forgive me 🥺"
];

// CREATE HOLES
for (let i = 0; i < 6; i++) {
  const hole = document.createElement('div');
  hole.classList.add('hole');

  const img = document.createElement('img');
  img.src = 'face.png';
  img.classList.add('face');

  img.addEventListener('click', () => {
    if (!gameActive) return;

    score++;
    scoreDisplay.textContent = `Hits: ${score}`;
    message.textContent = messages[Math.floor(Math.random() * messages.length)];

    createHeart();

    hole.classList.remove('active');

    if (score >= 15) endGame();
  });

  hole.appendChild(img);
  grid.appendChild(hole);
}

const holes = document.querySelectorAll('.hole');

// RANDOM POP
function randomPop() {
  if (!gameActive) return;

  holes.forEach(h => h.classList.remove('active'));

  const index = Math.floor(Math.random() * holes.length);
  holes[index].classList.add('active');
}

setInterval(randomPop, 600);

// TIMER
setInterval(() => {
  if (!gameActive) return;

  timeLeft--;
  timerDisplay.textContent = `Time: ${timeLeft}`;

  if (timeLeft <= 0) {
    message.textContent = "You're too slow 😭";
    endGame();
  }
}, 1000);

// HEARTS
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = '❤️';
  heart.style.left = Math.random() * window.innerWidth + 'px';

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 4000);
}

// END GAME
function endGame() {
  gameActive = false;
  document.querySelector('.grid').style.display = 'none';
  document.getElementById('endScreen').style.display = 'block';
}

// FINAL SCREEN
function showFinal() {
  document.getElementById('endScreen').style.display = 'none';
  document.getElementById('finalScreen').style.display = 'block';
}