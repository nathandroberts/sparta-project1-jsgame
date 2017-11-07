document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
  (function(){
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
  })();

var canvas = document.querySelector('canvas')
console.log(canvas);
//canvas width 800 height 500
var content = canvas.getContext('2d');
var newGame = 'yes';
//ball variables
var ballRadius = 12;
var xBall = 400;
var yBall= 200;
var xBallSpeed = 0;
var yBallSpeed = 4;
//paddle variables
var xPaddle = 300;
var yPaddle = 460;
var paddleWidth = 200;
var paddleHeight = 20;
//block variables
var numberOfBlockRows = 5;
var numberOfBlockColumns = 9;
var blockWidth = 90;
var blockHeight = 20;
var blockPadding = 3;
var blocks = [];
//win and loss conditions
var blocksLeft = 0;
var lives = 3;
//start of the game
LaunchGameScreen();

function LaunchGameScreen(){
  gameTitleText();
  gameInfoText();
  canvas.addEventListener('click', function (event) {
    if (newGame === 'yes') {
      startGame();
      newGame = 'no';
    }
  })
}

function gameTitleText() {
  content.font = "80px Arial";
  content.fillStyle = "blue";
  content.fillText("Block Breaker",150,170);
}
function gameInfoText() {
  content.font = "40px Arial";
  content.fillStyle = "green";
  content.fillText("Click to Start",280,240);
}
function makePaddle() {
  content.clearRect((0), (0), (canvas.width), (canvas.height))
  content.beginPath();
  // xcoordinate y width height
  content.rect(xPaddle, yPaddle, paddleWidth, paddleHeight);
  content.fillStyle = 'blue';
  content.fill();
  content.closePath();
}

function makeBlock(loopInputRow, loopInputColumn) {
  content.beginPath();
  // x coordinate, y coordinate, width, height
  content.rect((blockWidth * loopInputRow), (blockHeight * loopInputColumn), (blockWidth -blockPadding), (blockHeight - blockPadding));
  content.fillStyle = 'red';
  content.fill();
  content.closePath();
}
function blockPositionIndex(column, row) {
  return column + numberOfBlockColumns * row;
}
function multipleBlocks() {
  //rows of blocks
  for (var j = 0; j <numberOfBlockRows; j++) {
    //columns of blocks
    for (var i = 0; i < numberOfBlockColumns; i++) {
      //calculates array number of each block in blocks[] based on i and j
      var blockPositionIndexValue = blockPositionIndex(i, j)
      if (blocks[blockPositionIndexValue] === true) {
        makeBlock(i, j);

      }
    }
  }
  requestAnimationFrame(multipleBlocks)
}

function allBlocksVisible() {
  for (var i = 0; i < numberOfBlockColumns*numberOfBlockRows; i++) {
    blocks[i]= true;
    blocksLeft++;
  }
}

function gameCounter() {
//if statement with blocksLeft
}

function movePaddle() {
  canvas.addEventListener('mousemove', function (event) {
    var xMouse = event.clientX;     // Get the horizontal coordinate
    var yMouse = event.clientY;
    //centers paddle
    xPaddle = xMouse - (paddleWidth/2)

  })
  requestAnimationFrame(movePaddle)
}
function makeBall() {
  if (lives > 0 && blocksLeft > 0){

    content.beginPath();
    //inputs (ball x coordinate, y coordinate,radius start angle of circle, endAngle)
    content.arc(xBall, yBall, ballRadius, 0, Math.PI * 2);
    content.fillStyle = 'green';
    content.fill();
    content.closePath()
    //making the ball move
    xBall += xBallSpeed;
    yBall += yBallSpeed
    //making the ball rebound at edges
    //and preventing its velocity from trapping it when it bounces off of paddle and wall at same time
    if ((xBall> canvas.width && xBallSpeed > 0) || (xBall < 0 && xBallSpeed < 0)) {
    xBallSpeed = -xBallSpeed;
    }
    if (yBall <0) {
    yBallSpeed = -yBallSpeed;
    }
    if (yBall > canvas.height) {
      ballOutOfPlay()
    }
  }
  requestAnimationFrame(makeBall);
  collisionDetectionBall()
}
function collisionDetectionBall() {

  //corners of paddle
  var yPaddleTop = yPaddle;
  var yPaddleBottom = yPaddle - paddleHeight;
  var xPaddleLeft =  xPaddle;
  var xPaddleRight = xPaddle + paddleWidth;

  var xBallDistanceFromPaddleCenter = xBall - (xPaddle + paddleWidth/2)
  //corners of paddle compared to ball coordinates
  if (yBall < yPaddleTop &&
      yBall > yPaddleBottom &&
      xBall > xPaddleLeft &&
      xBall < xPaddleRight) {
    //bounce ball
    yBallSpeed = -yBallSpeed;
    //aiming function slower speed at edges
    xBallSpeed = xBallDistanceFromPaddleCenter * 0.25;
  }
  //block bouncing code
  //x position of ball relative to block width in column
  var ballBlockColumn = Math.floor(xBall / blockWidth)
  //y position of ball relative to block height
  var ballBlockRow = Math.floor(yBall / blockHeight)
  var blockIndexAtBallPosition = blockPositionIndex(ballBlockColumn, ballBlockRow)
  //if statement to remove blocks
  if (ballBlockColumn >=0 && ballBlockColumn <numberOfBlockColumns && ballBlockRow >=0 && ballBlockRow < numberOfBlockRows) {
    //check if block exists before bounce happens
    if (blocks[blockIndexAtBallPosition]) {
      //remove block and bounce
      blocks[blockIndexAtBallPosition] = false;
      blocksLeft--;
      yBallSpeed = -yBallSpeed;
    }
  }
}
function ballOutOfPlay() {
  lives--;
  xBall = 400;
  yBall= 200;
  xBallSpeed = 0;
  yBallSpeed = 4;
}
function gameHud() {
  blocksLeftText();
  livesLeftText();
  requestAnimationFrame(gameHud);
}
function blocksLeftText() {
  content.font = "30px Arial";
  content.fillStyle = "red";
  content.fillText("Blocks left : "+ blocksLeft,10,450);
}
function livesLeftText() {
  content.font = "30px Arial";
  content.fillStyle = "green";
  content.fillText("Lives : "+ lives,canvas.width- 130,450);
}
function gameOverScreen(){
  if (lives === 0){
    gameOverText();
    gameDonePromptText();
    gameOverReset();
  }
  requestAnimationFrame(gameOverScreen)
}
function gameOverText(){
  content.font = "100px Arial";
  content.fillStyle = "red";
  content.fillText("GAME OVER", 80, 250);
}
function gameDonePromptText() {
  content.font = "50px Arial";
  content.fillStyle = "black";
  content.fillText("Click to start a new game", 100, 350);
}
function gameOverReset() {
  canvas.addEventListener('click', function (event) {
    window.location.reload();
  })
}
function gameWon() {
  if (blocksLeft === 0){
  gameWonText();
  gameDonePromptText();
  gameOverReset();
  }
  requestAnimationFrame(gameWon);
}
function gameWonText() {
  content.font = "100px Arial";
  content.fillStyle = "red";
  content.fillText("GAME WON", 80, 250);
}
//game functions

function startGame() {

    gameHud();
    allBlocksVisible();
    multipleBlocks();
    movePaddle();
    setInterval(makePaddle, 10);
    makePaddle();
    makeBall();
    gameOverScreen();
    gameWon();
}
});
