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
var yBall= 450;
var xBallSpeed = 2;
var yBallSpeed = -1;
//paddle variables
var xPaddle = 300;
var yPaddle = 460;
var paddleWidth = 200;
var paddleHeight = 20;

function makePaddle() {
  content.clearRect((xPaddle - 5), (yPaddle- 5), (paddleWidth +10), (paddleHeight+ 10))
  content.beginPath();
  // xcoordinate y width height
  content.rect(xPaddle, yPaddle, paddleWidth, paddleHeight);
  content.fillStyle = 'blue';
  content.fill();
  content.closePath();
}


function makeBall() {
  // starting position x , y, width of erase box, height
  content.clearRect((xBall - ballRadius - 3) , (yBall - ballRadius - 3) , (2.*ballRadius+ 10), (2.*ballRadius+ 10))
  content.beginPath();
  //ball x coordinate, y coordinate,radius start angle of circle, endAngle
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
}
function movePaddle() {
  canvas.addEventListener('mousemove', function (event) {
    var xMouse = event.clientX;     // Get the horizontal coordinate
    var yMouse = event.clientY;

    xPaddle = xMouse
    // 390 480 y limits
    if (yMouse > 390 && yMouse < 470) {
      yPaddle = yMouse
    }
    collisionDetectionPaddle(yPaddle, yBall)
  })
  requestAnimationFrame(movePaddle)
}
function collisionDetectionPaddle(yPaddleCoordinate, yBallCoordinate) {
  for (var i = 0; i < (xPaddle + paddleWidth); i++) {

    if (yPaddleCoordinate === yBallCoordinate && (xPaddle+ i) === xBall ){
      yBallSpeed = -yBallSpeed
      console.log('xPaddle' + ' '+ i);
    }
  }
}

movePaddle()
// setInterval(makePaddle, 10)
// setInterval(makeBall,10)
makePaddle()
makeBall()

});
