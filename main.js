const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
//let hue = 0
let hue = 28;
let frame = 0; //keeps track of framecount (can add enemies, powerups after 500 frames etc.) Mainly used to set interval in which pipes appear
let score = 0;
let gamespeed = 2; //move obstacles, background, particle at same speed

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.5', '#000');
gradient.addColorStop('0.55', '#4040ff');
gradient.addColorStop('0.6', '#000');
gradient.addColorStop('0.9', '#fff');

const background = new Image();
background.src = 'desert.png';
const desert = {
    x1: 0, //backgroud 1
    x2: canvas.width, //background 2
    y: 0,
    width: canvas.width,
    height: canvas.height
}

function handleBackground() {
    if (desert.x1 <= -desert.width + gamespeed) desert.x1 = desert.width;
    else desert.x1 -= gamespeed;
    if (desert.x2 <= -desert.width + gamespeed) desert.x2 = desert.width;
    else desert.x2 -= gamespeed;
    ctx.drawImage(background, desert.x1, desert.y, desert.width, desert.height);
    ctx.drawImage(background, desert.x2, desert.y, desert.width, desert.height);
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillRect(10,temp,50,50);
    handleBackground();
    handleObstacles();
    handleParticles();
    bird.update();
    bird.draw();
    ctx.fillStyle = gradient;
    ctx.font = '90px Georgia';
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);
    handleCollisions();
    if (handleCollisions()) return;
    requestAnimationFrame(animate); //recursion
    angle += 0.12;
    //hue++;
    frame++; //increase framecount by 1 for every animation loop cycle
}
animate();

window.addEventListener('keydown', function (e) {
    if (e.code === 'Space') spacePressed = true;
    bird.frameX =0;
});
window.addEventListener('keyup', function (e) {
    if (e.code === 'Space') spacePressed = false;
});

const bang = new Image();
bang.src = 'explosion.png';
function handleCollisions() {
    for (let i = 0; i < obstaclesArray.length; i++) {
        if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
                (bird.y > canvas.height - obstaclesArray[i].bottom &&
                    bird.y + bird.height < canvas.height))) {
            //collision detection
            ctx.drawImage(bang, bird.x-45, bird.y-50, 130, 130);
            ctx.font = "25px Georgia";
            ctx.fillStyle = 'white';
            ctx.fillText('Game Over, your score is ' + score, 160, canvas.height / 2 - 10);
            return true;
        }
    }
}

