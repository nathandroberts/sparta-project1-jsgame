document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
  (function(){
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
  })();

  var canvas = document.querySelector('canvas')
  console.log(canvas);
  //canvas width 800 height 500
  var content = canvas.getContext('2d');
  //for validation
  var newGame = 'yes';
  //ball variables
  var ballRadius = 12;
  var xBall = 400;
  var yBall= 200;
  var xBallSpeed = 0;
  var yBallSpeed = 4;
  var ballRadius = 12;
  //ball2 variables
  var xBall2 = 400;
  var yBall2= 200;
  var xBallSpeed2 = 0;
  var yBallSpeed2 = 4;
  var ball2inPlay = false;
  var ball2Animation= 'off'
  //ball3 variables
  var xBall3 = 400;
  var yBall3= 200;
  var xBallSpeed3 = 0;
  var yBallSpeed3 = 4;
  var ball3inPlay = false;
  var ball3Animation= 'off'
  //paddle variables
  var difficulty = 0.18;
  var difficultyBalanceModifier = 0.3;
  var xPaddle = 300;
  var yPaddle = 460;
  var paddleWidth = 200;
  var paddleHeight = 20;
  //block variables
  var numberOfBlockRows = 6;
  var numberOfBlockColumns = 9;
  var blockWidth = 90;
  var blockHeight = 15;
  var blockPadding = 3;
  var blocks = [];
  //win and loss conditions
  var blocksLeft = 0;
  var lives = 3;
  var seconds = 0;
  var time;
  //sound effects
  var startScreenTheme;
  var mainTheme;
  //blocktypes and related variables
  var ballBlock = 'red';
  var decreaseWidthBlock = 'DeepSkyBlue';
  var increaseWidthBlock = 'blue';
  var speedUpBlock = 'gold';
  var speedDownBlock = 'DarkGoldenRod'
  var basicBlock = 'lightgray'
  var doubleBlock = 'gray'
  var tripleBlock = 'black'
  var paddleWidthChange = 20;
  var yBallSpeedChangeMultiplier = 1.7;
  //start of the game
  LaunchGameScreen();

  function incrementTimeValue() {
    seconds++;
  }
function audioStartScreenTheme() {
  startScreenTheme = new Audio("sound/startScreenTheme.wav")
  startScreenTheme.loop = true;
  startScreenTheme.play();
}
  function LaunchGameScreen(){
    audioStartScreenTheme();
    gameTitleText();
    gameInfoText();
    canvas.addEventListener('click', function (event) {
      if (newGame === 'yes') {
        startScreenTheme.pause();
        startGame();
        newGame = 'no';
        //timer
        setInterval(incrementTimeValue, 1000)

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
//----------------------------------------------//
//TO DO
//Add an new input to make block function : block type array
//make the array with a new color string value
//make a random number generator in multipleBlocks for block type
// in collisionDetectionBall add if statements the different blocktypes
//status effects fastball y, temp slowball y, small/big paddle, second ball?,explosion?, life drop, hazard drop?
//---------------------------------------------//
  function makeBlock(loopInputRow, loopInputColumn, blockTypeInput) {
    content.beginPath();
    // x coordinate, y coordinate, width, height
    content.rect((blockWidth * loopInputRow), (blockHeight * loopInputColumn), (blockWidth -blockPadding), (blockHeight - blockPadding));
    content.fillStyle = blockTypeInput;
    content.fill();
    content.closePath();
  }
  function blockPositionIndex(column, row) {
    return column + numberOfBlockColumns * row;
  }
  function multipleBlocks() {
    var blockType;

    //rows of blocks
    for (var j = 0; j <numberOfBlockRows; j++) {
      //columns of blocks
      for (var i = 0; i < numberOfBlockColumns; i++) {
        blockType = randomNumberGenerator()
        if (blockType === 1) {
          //calculates array number of each block in blocks[] based on i and j
          var blockPositionIndexValue = blockPositionIndex(i, j)
          if (blocks[blockPositionIndexValue][0] === true) {
            if (blocks[blockPositionIndexValue][1] === 'typeNotSet') {
              blocks[blockPositionIndexValue][1] = ballBlock;
            }
            makeBlock(i, j, blocks[blockPositionIndexValue][1]);
          }
        } else if (blockType === 2) {
          //calculates array number of each block in blocks[] based on i and j
          var blockPositionIndexValue = blockPositionIndex(i, j)
          if (blocks[blockPositionIndexValue][0] === true) {
            if (blocks[blockPositionIndexValue][1] === 'typeNotSet') {
              blocks[blockPositionIndexValue][1] = decreaseWidthBlock;
            }
            makeBlock(i, j, blocks[blockPositionIndexValue][1]);
          }
        } else if (blockType === 3) {
          //calculates array number of each block in blocks[] based on i and j
          var blockPositionIndexValue = blockPositionIndex(i, j)
          if (blocks[blockPositionIndexValue][0] === true) {
            if (blocks[blockPositionIndexValue][1] === 'typeNotSet') {
              blocks[blockPositionIndexValue][1] = increaseWidthBlock;
            }
            makeBlock(i, j, blocks[blockPositionIndexValue][1]);
          }
        } else if (blockType === 4) {
          //calculates array number of each block in blocks[] based on i and j
          var blockPositionIndexValue = blockPositionIndex(i, j)
          if (blocks[blockPositionIndexValue][0] === true) {
            if (blocks[blockPositionIndexValue][1] === 'typeNotSet') {
              blocks[blockPositionIndexValue][1] = speedUpBlock;
            }
            makeBlock(i, j, blocks[blockPositionIndexValue][1]);
          }
        } else if (blockType === 5) {
          //calculates array number of each block in blocks[] based on i and j
          var blockPositionIndexValue = blockPositionIndex(i, j)
          if (blocks[blockPositionIndexValue][0] === true) {
            if (blocks[blockPositionIndexValue][1] === 'typeNotSet') {
              blocks[blockPositionIndexValue][1] = speedDownBlock;
            }
            makeBlock(i, j, blocks[blockPositionIndexValue][1]);
          }
        } else if (blockType === 6) {
          //calculates array number of each block in blocks[] based on i and j
          var blockPositionIndexValue = blockPositionIndex(i, j)
          if (blocks[blockPositionIndexValue][0] === true) {
            if (blocks[blockPositionIndexValue][1] === 'typeNotSet') {
              blocks[blockPositionIndexValue][1] = basicBlock;
            }
            makeBlock(i, j, blocks[blockPositionIndexValue][1]);
          }
        }  else if (blockType === 7) {
          //calculates array number of each block in blocks[] based on i and j
          var blockPositionIndexValue = blockPositionIndex(i, j)
          if (blocks[blockPositionIndexValue][0] === true) {
            if (blocks[blockPositionIndexValue][1] === 'typeNotSet') {
              blocks[blockPositionIndexValue][1] = doubleBlock;
            }
            makeBlock(i, j, blocks[blockPositionIndexValue][1]);
          }
        } else if (blockType === 8) {
          //calculates array number of each block in blocks[] based on i and j
          var blockPositionIndexValue = blockPositionIndex(i, j)
          if (blocks[blockPositionIndexValue][0] === true) {
            if (blocks[blockPositionIndexValue][1] === 'typeNotSet') {
              blocks[blockPositionIndexValue][1] = tripleBlock;
            }
            makeBlock(i, j, blocks[blockPositionIndexValue][1]);
          }
        }
      }
    }
    requestAnimationFrame(multipleBlocks)
  }
  //used to make blocks appear
  function allBlocksVisible() {
    for (var i = 0; i < numberOfBlockColumns*numberOfBlockRows; i++) {
      blocks[i]= [true, 'typeNotSet']
      blocksLeft++;
    }
  }
  function randomNumberGenerator() {
    return Math.floor(Math.random()* 8 + 1)
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
  function makeBall2() {
    if (ball2Animation === 'on' && lives > 0 && blocksLeft > 0){
      ball2inPlay = true
      content.beginPath();
      //inputs (ball x coordinate, y coordinate,radius start angle of circle, endAngle)
      content.arc(xBall2, yBall2, ballRadius, 0, Math.PI * 2);
      content.fillStyle = 'magenta';
      content.fill();
      content.closePath()
      //making the ball move
      xBall2 += xBallSpeed2;
      yBall2 += yBallSpeed2;
      //making the ball rebound at edges
      //and preventing its velocity from trapping it when it bounces off of paddle and wall at same time
      if ((xBall2> canvas.width && xBallSpeed2 > 0) || (xBall2 < 0 && xBallSpeed2 < 0)) {
      xBallSpeed2 = -xBallSpeed2;
      }
      if (yBall2 <0) {
      yBallSpeed2 = -yBallSpeed2;
      }
      if (yBall2 > canvas.height) {
        ball2inPlay= false;
        ball2Animation = 'off'
      }
    }
    requestAnimationFrame(makeBall2);
    collisionDetectionBall2()
  }
  function makeBall3() {
    if (ball3Animation === 'on' && lives > 0 && blocksLeft > 0){
      ball3inPlay = true
      content.beginPath();
      //inputs (ball x coordinate, y coordinate,radius start angle of circle, endAngle)
      content.arc(xBall3, yBall3, ballRadius, 0, Math.PI * 2);
      content.fillStyle = 'red';
      content.fill();
      content.closePath()
      //making the ball move
      xBall3 += xBallSpeed3;
      yBall3 += yBallSpeed3;
      //making the ball rebound at edges
      //and preventing its velocity from trapping it when it bounces off of paddle and wall at same time
      if ((xBall3> canvas.width && xBallSpeed3 > 0) || (xBall3 < 0 && xBallSpeed3 < 0)) {
      xBallSpeed3 = -xBallSpeed3;
      }
      if (yBall3 <0) {
      yBallSpeed3 = -yBallSpeed3;
      }
      if (yBall3 > canvas.height) {
        ball3inPlay= false;
        ball3Animation = 'off'
      }
    }
    requestAnimationFrame(makeBall3);
    collisionDetectionBall3()
  }
  function paddleCollision() {
    //corners of paddle
    var yPaddleTop = yPaddle;
    var yPaddleBottom = yPaddle - paddleHeight;
    var xPaddleLeft =  xPaddle;
    var xPaddleRight = xPaddle + paddleWidth;

    var xBallDistanceFromPaddleCenter = xBall - (xPaddle + paddleWidth/2)
    //corners of paddle compared to ball coordinates to bounce ball off of paddle
    if (yBall < yPaddleTop &&
        yBall > yPaddleBottom &&
        xBall > xPaddleLeft &&
        xBall < xPaddleRight) {
      //bounce ball
      yBallSpeed = -yBallSpeed;
      //aiming function greater x velocity at edges
      xBallSpeed = xBallDistanceFromPaddleCenter * difficulty;
    }
  }
  function paddleCollisionBall2() {
    //corners of paddle
    var yPaddleTop = yPaddle;
    var yPaddleBottom = yPaddle - paddleHeight;
    var xPaddleLeft =  xPaddle;
    var xPaddleRight = xPaddle + paddleWidth;

    var xBallDistanceFromPaddleCenter = xBall2 - (xPaddle + paddleWidth/2)
    //corners of paddle compared to ball coordinates to bounce ball off of paddle
    if (yBall2 < yPaddleTop &&
        yBall2 > yPaddleBottom &&
        xBall2 > xPaddleLeft &&
        xBall2 < xPaddleRight) {
      //bounce ball
      yBallSpeed2 = -yBallSpeed2;
      //aiming function greater x velocity at edges
      xBallSpeed2 = xBallDistanceFromPaddleCenter * difficulty;
    }
  }
  function paddleCollisionBall3() {
    //corners of paddle
    var yPaddleTop = yPaddle;
    var yPaddleBottom = yPaddle - paddleHeight;
    var xPaddleLeft =  xPaddle;
    var xPaddleRight = xPaddle + paddleWidth;

    var xBallDistanceFromPaddleCenter = xBall3 - (xPaddle + paddleWidth/2)
    //corners of paddle compared to ball coordinates to bounce ball off of paddle
    if (yBall3 < yPaddleTop &&
        yBall3 > yPaddleBottom &&
        xBall3 > xPaddleLeft &&
        xBall3 < xPaddleRight) {
      //bounce ball
      yBallSpeed3 = -yBallSpeed3;
      //aiming function greater x velocity at edges
      xBallSpeed3 = xBallDistanceFromPaddleCenter * difficulty;
    }
  }
  function blockCollision() {
    //block bouncing code
    //x position of ball relative to block width in column
    var ballBlockColumn = Math.floor(xBall / blockWidth)
    //y position of ball relative to block height
    var ballBlockRow = Math.floor(yBall / blockHeight)
    var blockIndexAtBallPosition = blockPositionIndex(ballBlockColumn, ballBlockRow)
    //if statement to remove blocks
    if (ballBlockColumn >=0 && ballBlockColumn <numberOfBlockColumns && ballBlockRow >=0 && ballBlockRow < numberOfBlockRows) {
      //check if block exists before bounce happens
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === ballBlock) {
        //remove block and bounce
        blocks[blockIndexAtBallPosition][0] = false;
        blocksLeft--;
        yBallSpeed = -yBallSpeed;
       if (ball2inPlay === false) {
        ball2Animation ='on'
        xBall2 = 400;
        yBall2= 200;
        xBallSpeed2 = 0;
        yBallSpeed2 = 4;
        makeBall2()
       }
       if (ball3inPlay === false) {
        ball3Animation ='on'
        xBall3 = 400;
        yBall3= 200;
        xBallSpeed3 = 0;
        yBallSpeed3 = 4;
        makeBall3()
       }
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === basicBlock) {
        //remove block and bounce
        blocks[blockIndexAtBallPosition][0] = false;
        blocksLeft--;
        yBallSpeed = -yBallSpeed;
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === doubleBlock) {
        //change blocktype
        blocks[blockIndexAtBallPosition][1] = basicBlock;
        yBallSpeed = -yBallSpeed;
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === tripleBlock) {
        //change blocktype
        blocks[blockIndexAtBallPosition][1] = doubleBlock;
        yBallSpeed = -yBallSpeed;
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === speedUpBlock) {
        //remove block and bounce
        blocks[blockIndexAtBallPosition][0] = false;
        blocksLeft--;
        yBallSpeed = -yBallSpeed * yBallSpeedChangeMultiplier;
        difficulty= difficulty * difficultyBalanceModifier
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === speedDownBlock ) {
        //remove block and bounce
        blocks[blockIndexAtBallPosition][0] = false;
        blocksLeft--;
        yBallSpeed = -yBallSpeed / yBallSpeedChangeMultiplier;
        difficulty= difficulty / difficultyBalanceModifier
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === increaseWidthBlock) {
        //remove block and bounce
        blocks[blockIndexAtBallPosition][0] = false;
        paddleWidth = paddleWidth +paddleWidthChange;
        blocksLeft--;
        yBallSpeed = -yBallSpeed;
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === decreaseWidthBlock) {
        //remove block and bounce
        paddleWidth = paddleWidth -paddleWidthChange;
        blocks[blockIndexAtBallPosition][0] = false;
        blocksLeft--;
        yBallSpeed = -yBallSpeed;
      }

    }
  }
  function blockCollisionBall2() {
    //block bouncing code
    //x position of ball relative to block width in column
    var ballBlockColumn = Math.floor(xBall2 / blockWidth)
    //y position of ball relative to block height
    var ballBlockRow = Math.floor(yBall2 / blockHeight)
    var blockIndexAtBallPosition = blockPositionIndex(ballBlockColumn, ballBlockRow)
    //if statement to remove blocks
    if (ballBlockColumn >=0 && ballBlockColumn <numberOfBlockColumns && ballBlockRow >=0 && ballBlockRow < numberOfBlockRows) {
      //check if block exists before bounce happens
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === ballBlock) {
        //remove block and bounce
        blocks[blockIndexAtBallPosition][0] = false;
        blocksLeft--;
        yBallSpeed2 = -yBallSpeed2;
        if (ball3inPlay === false) {
         ball3Animation ='on'
         xBall3 = 400;
         yBall3= 200;
         xBallSpeed3 = 0;
         yBallSpeed3 = 4;
         makeBall3()
        }
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === basicBlock) {
        //remove block and bounce
        blocks[blockIndexAtBallPosition][0] = false;
        blocksLeft--;
        yBallSpeed2 = -yBallSpeed2;
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === doubleBlock) {
        //change blocktype
        blocks[blockIndexAtBallPosition][1] = basicBlock;
        yBallSpeed2 = -yBallSpeed2;
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === tripleBlock) {
        //change blocktype
        blocks[blockIndexAtBallPosition][1] = doubleBlock;
        yBallSpeed2 = -yBallSpeed2;
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === speedUpBlock) {
        //remove block and bounce
        blocks[blockIndexAtBallPosition][0] = false;
        blocksLeft--;
        yBallSpeed2 = -yBallSpeed2 * yBallSpeedChangeMultiplier;
        difficulty= difficulty * difficultyBalanceModifier
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === speedDownBlock ) {
        //remove block and bounce
        blocks[blockIndexAtBallPosition][0] = false;
        blocksLeft--;
        yBallSpeed2 = -yBallSpeed2 / yBallSpeedChangeMultiplier;
        difficulty= difficulty / difficultyBalanceModifier
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === increaseWidthBlock) {
        //remove block and bounce
        blocks[blockIndexAtBallPosition][0] = false;
        paddleWidth = paddleWidth +paddleWidthChange;
        blocksLeft--;
        yBallSpeed2 = -yBallSpeed2;
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === decreaseWidthBlock) {
        //remove block and bounce
        paddleWidth = paddleWidth -paddleWidthChange;
        blocks[blockIndexAtBallPosition][0] = false;
        blocksLeft--;
        yBallSpeed2 = -yBallSpeed2;
      }

    }
  }
  function blockCollisionBall3() {
    //block bouncing code
    //x position of ball relative to block width in column
    var ballBlockColumn = Math.floor(xBall3 / blockWidth)
    //y position of ball relative to block height
    var ballBlockRow = Math.floor(yBall3 / blockHeight)
    var blockIndexAtBallPosition = blockPositionIndex(ballBlockColumn, ballBlockRow)
    //if statement to remove blocks
    if (ballBlockColumn >=0 && ballBlockColumn <numberOfBlockColumns && ballBlockRow >=0 && ballBlockRow < numberOfBlockRows) {
      //check if block exists before bounce happens
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === ballBlock) {
        //remove block and bounce
        blocks[blockIndexAtBallPosition][0] = false;
        blocksLeft--;
        yBallSpeed3 = -yBallSpeed3;
        if (ball2inPlay === false) {
         ball2Animation ='on'
         xBall2 = 400;
         yBall2= 200;
         xBallSpeed2 = 0;
         yBallSpeed2 = 4;
         makeBall2()
        }
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === basicBlock) {
        //remove block and bounce
        blocks[blockIndexAtBallPosition][0] = false;
        blocksLeft--;
        yBallSpeed3 = -yBallSpeed3;
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === doubleBlock) {
        //change blocktype
        blocks[blockIndexAtBallPosition][1] = basicBlock;
        yBallSpeed3 = -yBallSpeed3;
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === tripleBlock) {
        //change blocktype
        blocks[blockIndexAtBallPosition][1] = doubleBlock;
        yBallSpeed3 = -yBallSpeed3;
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === speedUpBlock) {
        //remove block and bounce
        blocks[blockIndexAtBallPosition][0] = false;
        blocksLeft--;
        yBallSpeed3 = -yBallSpeed3 * yBallSpeedChangeMultiplier;
        difficulty= difficulty * difficultyBalanceModifier
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === speedDownBlock ) {
        //remove block and bounce
        blocks[blockIndexAtBallPosition][0] = false;
        blocksLeft--;
        yBallSpeed3 = -yBallSpeed3 / yBallSpeedChangeMultiplier;
        difficulty= difficulty / difficultyBalanceModifier
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === increaseWidthBlock) {
        //remove block and bounce
        blocks[blockIndexAtBallPosition][0] = false;
        paddleWidth = paddleWidth +paddleWidthChange;
        blocksLeft--;
        yBallSpeed3 = -yBallSpeed3;
      }
      if (blocks[blockIndexAtBallPosition][0] === true && blocks[blockIndexAtBallPosition][1] === decreaseWidthBlock) {
        //remove block and bounce
        paddleWidth = paddleWidth -paddleWidthChange;
        blocks[blockIndexAtBallPosition][0] = false;
        blocksLeft--;
        yBallSpeed3 = -yBallSpeed3;
      }

    }
  }
  function collisionDetectionBall() {
    paddleCollision();
    blockCollision();
  }
  function collisionDetectionBall2() {
    paddleCollisionBall2();
    blockCollisionBall2();
  }
  function collisionDetectionBall3() {
    paddleCollisionBall3();
    blockCollisionBall3();
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
    timePassed();
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
  function timePassed() {
    if (lives>0 && blocksLeft>0) {
      time = seconds;
    }
    content.font = "30px Arial";
    content.fillStyle = "black";
    content.fillText("Time: "+ time, 10, 410);
  }
  //functions that are activated if game is lost
  function gameOverScreen(){
    if (lives === 0){
      gameOverText();
      gameDonePromptText();
      gameOverReset();
      mainTheme.pause();
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
  //functions that are activated if the game is won
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
  function audioMainTheme() {
    mainTheme = new Audio("sound/mainTheme.mp3")
    mainTheme.loop = true;
    mainTheme.play();
  }
  //game functions

  function startGame() {
    audioMainTheme();
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
