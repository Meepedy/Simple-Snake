'use strict';
console.log("app.js loaded");
window.onload = function () {

    document.addEventListener('keydown', keyPush);
    setInterval(game, 1000 / 15);
}

let playerX = 10;
let playerY = 10;
let gridSize = 20;
let tileCount = 20;
let appleX = 15;
let appleY = 15;
let xVelocity = 0;
let yVelocity = 0;
let trail = [];
let tail = 5;
let score = 0;
let highscore = 0;

function game() {
  let canv = document.getElementById('gameCanvas');
  let context = canv.getContext('2d');
  playerX += xVelocity;
  playerY += yVelocity;
  if (playerX < 0) {
    restart();
  }
  if (playerX > tileCount - 1) {
    restart();
  }
  if (playerY < 0) {
    restart();
  }
  if (playerY > tileCount - 1) {
    restart();
  }

  context.fillStyle = '#C6C6C6';
  context.fillRect(0, 0, canv.width, canv.height);

  context.fillStyle = '#666';
  for (let i = 0; i < trail.length; i++) {
    context.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
    if (trail[i].x == playerX && trail[i].y == playerY) {
    restart();
    }
  }
  trail.push({
    x: playerX,
    y: playerY
  });
  while (trail.length > tail) {
    trail.shift();
  }

  if (appleX == playerX && appleY == playerY) {
    tail++;
    score++;
    document.getElementById('score').innerText = 'Score: ' + score;

    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
  }
  context.fillStyle = '#F2F2F2';
  context.fillRect(appleX * gridSize, appleY * gridSize, gridSize - 2, gridSize - 2);
}

function keyPush(evt) {
    switch (evt.keyCode) {
        //WASD key movements
    case 65:
        if(xVelocity === 1){
          return;
        }
        xVelocity = -1;
        yVelocity = 0;
        break;
    case 87:
      if(yVelocity === 1){
        return;
      }
        xVelocity = 0;
        yVelocity = -1;
        break;
    case 68:
      if(xVelocity === -1){
        return;
      }
        xVelocity = 1;
        yVelocity = 0;
        break;
    case 83:
      if(yVelocity === -1){
        return;
      }
        xVelocity = 0;
        yVelocity = 1;
        break;
    }
}

function restart(){
  if(score > highscore) {
    highscore = score; 
    localStorage['highScore'] = highscore;
  }
  playerX = 10;
  playerY = 10;
  tail = 5;
  score = 0
  document.getElementById('score').innerText = 'Score: ' + score;
  if(localStorage['highScore'] != null) {
    document.getElementById('highScore').innerText = 'High Score: ' + localStorage['highScore'];
  } else {
    return
  }
}

