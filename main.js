document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
  (function(){
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
  })();

var canvas = document.querySelector('canvas')
console.log(canvas);
//canvas width 800 height 500
var content = canvas.getContext('2d');
//ball variables
var ballRadius = 12;
var xBall = 400;
var yBall= 400;
var xBallSpeed = 2;
var yBallSpeed = -4;
//paddle variables
var xPaddle = 300;
var yPaddle = 460;
var paddleWidth = 200;
var paddleHeight = 20;
//block variables
var numberOfBlockRows = 5;
var numberOfBlockColumns = 9;
var blockWidth = 90;
var blockHeight = 30;
var blockPadding = 3;
// var blockSpaceFromTop = 30;
// var brickSpaceFromLeft = 30;
var blocks = [];

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
function removeBlock() {
  for (var i = 0; i < numberOfBlockColumns; i++) {
    blocks[i]= true;
  }
// blocks[2] = false;
}

function multipleBlocks() {
  //rows of blocks
  for (var j = 0; j <numberOfBlockRows; j++) {
    //columns of blocks
    for (var i = 0; i < numberOfBlockColumns; i++) {
      if (blocks[i] == true) {

        makeBlock(i, j);
      }
    }
  }
  requestAnimationFrame(multipleBlocks)
}


function makeBall() {
  content.beginPath();
  //inputs (ball x coordinate, y coordinate,radius start angle of circle, endAngle)
  content.arc(xBall, yBall, ballRadius, 0, Math.PI * 2);
  content.fillStyle = 'green';
  content.fill();
  content.closePath()
  xBall += xBallSpeed;
  yBall += yBallSpeed
  if (xBall> canvas.width ||xBall <0) {
  xBallSpeed = -xBallSpeed;
  }
  if (yBall > canvas.height || yBall <0) {
  yBallSpeed = -yBallSpeed;
  }
  requestAnimationFrame(makeBall);
  collisionDetectionPaddle()
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

function collisionDetectionPaddle() {

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
    yBallSpeed = -yBallSpeed;
    console.log('Bounce');
    //aiming function slower speed at edges
    xBallSpeed = xBallDistanceFromPaddleCenter * 0.25;
  }

}
removeBlock()
multipleBlocks()
movePaddle()
setInterval(makePaddle, 10)
// setInterval(makeBall,10)
makePaddle()
makeBall()
});
