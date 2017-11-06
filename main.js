
console.log(canvas);


var canvas = document.querySelector('canvas')
var content = canvas.getContext('2d');
//ball variables
var ballRadius = 12;
var xBall = 400;
var yBall= 450;
var xBallSpeed = 2;
var yBallSpeed = 1;
//paddle variables
var xPaddle = 300;
var yPaddle = 460;
var paddleWidth = 200;
var paddleHeight = 20;

function makePaddle() {
  content.beginPath();
  // xcoordinate y width height
  content.rect(xPaddle, yPaddle, paddleWidth, paddleHeight);
  content.fillStyle = 'blue';
  content.fill();
  content.closePath();
}


function makeBall() {
  // starting position x , y, width of erase box, height
  content.clearRect(0,0, canvas.width, canvas.height)
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
}
function movePaddle() {
  canvas.addEventListener('mousemove', function (event) {
    var xMouse = event.clientX;     // Get the horizontal coordinate
    var yMouse = event.clientY;
    console.log(yMouse);
    xPaddle = xMouse
    // 390 480 y limits
    if (yMouse > 390 && yMouse < 470) {

      yPaddle = yMouse
    }
  })
}
movePaddle()
setInterval(makePaddle, 5)
setInterval(makeBall,10)
