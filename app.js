var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 400;
let x,y,dx,dy,radius,canvasW,canvasH,interval = false;
var paddleW = 60;
var paddleX = canvasW/2 - paddleW/2;
var paddleY = canvasH - 15;
canvasW = canvas.width;
canvasH = canvas.height;
let rightPressed = false;
let leftPressed = false;
document.addEventListener("keyup",handleKeyUp)
document.addEventListener("keydown",handleKeyDown);
var left = document.querySelector(".left");
var right = document.querySelector(".right");
left.addEventListener("mousedown",() => {
    leftPressed = true;
});
left.addEventListener("mouseup",() => {
    leftPressed = false;
})
right.addEventListener("mousedown",() => {
    rightPressed = true;
});
right.addEventListener("mouseup",() => {
    console.log("rioght up");
    rightPressed = false;
})

function handleKeyUp(e){
    if(e.key == "Enter"){
        startGame();
    }
   if(e.key == "ArrowRight"){
       rightPressed = false;
   }
   if(e.key == "ArrowLeft"){
       leftPressed = false;
   }
}
function handleKeyDown(e){
    if(e.key == "ArrowRight"){
        rightPressed = true;
    }
    if(e.key == "ArrowLeft"){
        leftPressed = true;
    }
}
setVariables();
drawBall();
startGame();
function setVariables(){
    x = canvasW/2;
    y = canvasH - 20;
    dx = 5;
    dy = -5;
    radius = 15;
}
function startGame(){
    paddleW = 60;
    paddleX = canvasW/2 - paddleW/2;
    paddleY = canvasH - 10;
    if(!interval){
        interval = setInterval(()=>{
            if(rightPressed == true){
                paddleX = paddleX + 5;
                // console.log("hello");
            }
            if(leftPressed == true){
                paddleX = paddleX - 5;
            }
            detectCollision();
            x += dx;
            y += dy;
            let checkGameO = checkGameOver();
            if(checkGameO){
                paddleW = 60;
                paddleX = canvasW/2 - paddleW/2;
                paddleY = canvasH - 10;
                leftPressed = false;
                rightPressed = false;
            }
            c.clearRect(0,0,canvasW,canvasH);
            drawBall();
            drawPaddle();
        },20);
    }
}
function checkGameOver(){
    if(y+dy === canvasH ){
        alert("over");
        clearInterval(interval);
        interval = false;
        setVariables();
        return true;
    }
}
function detectCollision(){
    if(x + dx >= canvasW || x + dx <= 0){
        dx = -dx;
    }
    if(y + dy > canvasH - radius){
        if(x + dx > paddleX && x + dx < ( paddleX + paddleW)){
            dy = -dy;
        }
    }
    if(y + dy <= 0){
        dy = -dy;
    }
}
function drawBall(){
    c.beginPath();
    c.arc(x,y,radius,0,2*Math.PI,false);
    c.fillStyle = "green";
    c.fill();
    c.closePath();
}
function drawPaddle(){
    c.beginPath();
    c.rect(paddleX,paddleY,paddleW,10);
    c.fillStyle = "#fada3e";
    c.fill();
    c.closePath();
}