// Board

const scoreGame = document.getElementById("score");
const reset = document.getElementById("reset");

const blockSize = 25;
const rows = 20;
const cols = 20;
let board;
let context;

//snake

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
const snakeBorder = "black";

//snake body
let snakeBody = [];

// Snake Velocity

let velocityX = 0;
let velocityY = 0;

//food

let foodX;
let foodY;

// GameVelocity
let interval;

//score

let score = 0;

//Game Over

let gameOver = false;
let txt;

//Main Event

window.onload = function () {
  board = document.getElementById("canvas");
  board.width = cols * blockSize;
  board.height = rows * blockSize;
  ctx = board.getContext("2d");

  createFood();
  document.addEventListener("keyup", changeDirection);
  interval = setInterval(update, 1000 / 7);

  // Update function
};
function update() {
  if (gameOver) {
    return;
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, board.width, board.height);

  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    score += 1;
    scoreGame.textContent = score;
    snakeBody.push([foodX, foodY]);
    createFood();
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  ctx.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  ctx.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // Game Over;

  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    txt = document.createElement("p");
    txt.style.display = "block";
    txt.classList.add("gameOver");
    txt.textContent = "Game Over";
    document.body.appendChild(txt);
  } else {
    txt.style.display = "none";
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      txt.textContent = "Game Over";
      txt.style.display = "block";
      txt.classList.add("gameOver");
    }
  }
}

// snake movement

function changeDirection(event) {
  if (event.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (event.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  }
  if (event.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
  if (event.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

// create food;

function createFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

//Reset Game

function restartGame() {
  snakeX = blockSize * 5;
  snakeY = blockSize * 5;
  snakeBody = [];
  velocityX = 0;
  velocityY = 0;
  score = 0;
  scoreGame.textContent = score;
  gameOver = false;

  ctx.clearRect(0, 0, board.width, board.height);

  if (txt) {
    txt.style.display = "none";
  }
  createFood();
}

reset.addEventListener("click", () => {
  if (gameOver) {
    restartGame();
    clearInterval(interval);
    interval = setInterval(update, 1000 / 7);
  }
});
