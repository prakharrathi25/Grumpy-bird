// Create based on obstacles 
const obstaclesArray=[];

class Obstacle{
    constructor(){
        this.top = (Math.random() * canvas.height/3) + 20; // random number between 0 and canvas height/3 - height of top pipe
        this.bottom = (Math.random() * canvas.height/3) + 20; //height of bottom pipe
        this.x = canvas.width; 
        this.width = 20;
        //this.color = 'hsl('+ hue +',100%,50%,1)';
        this.color = 'hsl('+ hue +',65%,10%,0.8)';
        this.counted = false; //for score
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top); //top pipe
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom); //bottom pipe
    }
    update(){
        this.x -= gamespeed; //move obstacles to left by 2 pixels for every frame of animation;
        if(!this.counted && this.x < bird.x){ // score
            score++;
            this.counted = true;
        }
        this.draw();
    }
}

function handleObstacles(){
    if (frame%50 === 0){ //every 50 frames,
        obstaclesArray.unshift(new Obstacle);//add new obstacle
    }
    for (let i=0; i < obstaclesArray.length; i++){
        obstaclesArray[i].update();
    }
    if(obstaclesArray.length > 20){
        obstaclesArray.pop(obstaclesArray[0]);
    }
}
