const particlesArray = [];

class Particle{
    constructor(){
        this.x = bird.x;
        this.y = bird.y;
        this.size = Math.random() * 7 + 3;//between 3 and 10
        this.speedY = (Math.random()*1) - 0.5;//between 0.5 and -0.5 particle move up and own but only just a little bit like smoke
        //this.color = 'hsla(' + hue + ',100%,50%,0.8)';
        this.color = 'hsla(' + hue + ',65%,10%,0.8)';
    }
    update(){
        this.x -= gamespeed; //particles will move to the left as the game scrolls by
        this.y += this.speedY; // make it move up and down slightly and spread
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath(); //to start drawing
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);//to draw a circle
        ctx.fill();//fill circle with color
    }
}

function handleParticles(){
    particlesArray.unshift(new Particle); //adds attribute as item to beginning of array and returns new length
    for(i = 0; i<particlesArray.length; i++){
        particlesArray[i].update(); //calculates x and y position
        particlesArray[i].draw(); //draws circles at these coordinates
    }
    //if more than 200, remove 20
    if(particlesArray.length > 200){
        for(let i = 0; i < 20; i++){
            particlesArray.pop(particlesArray[i]);//removes last 20 elements from an array      
        }
    }
}