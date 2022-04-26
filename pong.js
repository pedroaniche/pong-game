//edge variables
let edgeWith=600;
let edgeHeight=edgeWith*2/3;

//ball variables
let ballDiameter=15;
let ballSpeed=5;

let xBall=edgeWith/2;
let yBall=edgeHeight/2;
let ballRadius=ballDiameter/2;

let xBallSpeed=ballSpeed;
let yBallSpeed=ballSpeed;

//racket variables
let xEdgeDistance=5;
let yEdgeDistance=150;
let racketWidth=10;
let racketHeight=90;
let roundedCorners=5;

let racketSpeed=10;
let racketSpeedIA;

let xRacketPlayer1=xEdgeDistance;
let yRacketPlayer1=yEdgeDistance;
let xRacketPlayer2=edgeWith-racketWidth-xEdgeDistance;
let yRacketPlayer2=yEdgeDistance;

let racketHit=false;

//score variables
let pointPlayer1=0;
let pointPlayer2=0;

//sound variables
let hit;
let point;
let soundtrack;

function preload() {
  soundtrack=loadSound('soundtrack.mp3');
  point=loadSound('point.mp3');
  hit=loadSound('hit.mp3');
}

function setup() {
  createCanvas(edgeWith,edgeHeight);
  soundtrack.loop();
}

function draw() {
  background('#09131b');
  drawBall();
  moveBall();
  collideBallEdge();
  drawRacket(xRacketPlayer1,yRacketPlayer1);
  moveRacket();
  collideBallRacket(xRacketPlayer1,yRacketPlayer1);
  drawRacket(xRacketPlayer2,yRacketPlayer2);
  moveRacketAI();
  collideBallRacket(xRacketPlayer2,yRacketPlayer2);
  drawScoreboard();
  makePoint();
}

function drawBall() {
  fill('#ff562f');
  circle(xBall,yBall,ballDiameter);
}

function moveBall() {
  xBall+=xBallSpeed;
  yBall+=yBallSpeed;
}

function collideBallEdge() {
  if(xBall<ballRadius||xBall>width-ballRadius) xBallSpeed*=-1;
  if(yBall<ballRadius||yBall>height-ballRadius) yBallSpeed*=-1;
}

function drawRacket(x,y) {
  fill('#ff562f');
  rect(x,y,racketWidth,racketHeight,roundedCorners);
}

function moveRacket() {
  if(keyIsDown(UP_ARROW)) yRacketPlayer1-=racketSpeed;
  if(keyIsDown(DOWN_ARROW)) yRacketPlayer1+=racketSpeed;
}

function collideBallRacket(x,y) {
  racketHit = collideRectCircle(x,y,racketWidth,racketHeight,xBall,yBall,ballRadius);
  if(racketHit) {
    xBallSpeed*=-1;
    hit.play();
  }
}

function moveRacketAI() {
  racketSpeedIA=yBall-yRacketPlayer2-racketHeight/2-30;
  yRacketPlayer2+=racketSpeedIA;
}

function drawScoreboard() {
  stroke('#ff562f');
  textAlign(CENTER);
  textSize(16);
  fill('#ff562f');
  rect(205,15,40,20,2);
  fill('#09131b');
  text(pointPlayer1,225,30);
  fill('#ff562f');
  rect(355,15,40,20,2);
  fill('#09131b');
  text(pointPlayer2,375,30);
}

function makePoint() {
  if(xBall>width-10) {
    pointPlayer1+=1;
    point.play();
  }
  if(xBall<10) {
    pointPlayer2+=1;
    point.play();
  }
}