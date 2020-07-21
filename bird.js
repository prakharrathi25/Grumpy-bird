const birdy = new Image();
birdy.src = 'spritesheet.png';


class Bird{
    constructor(){
        this.x = 150;
        this.y = 200;
        this.vy = 0;//velocity of the bird- how fast it moves up
        this.originialWidth = 800;
        this.originalHeight = 640;
        this.width=this.originialWidth/20;
        this.height=this.originalHeight/20;
        this.weight=1; // force constantly pulling player down unless wings are flapped
        this.frameX=0;
    }
    update(){ //calculate position and speed for bird at each frame 
        let curve = Math.sin(angle) * 20; //this function cycles between -1 and 1 over and over again
        if(this.y > canvas.height - (this.height * 3) + curve){
            this.y = canvas.height - (this.height * 3) + curve;
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y +=this.vy; //making it move down
        } 
        if(this.y < 0 + this.height){
            this.y = 0 + this.height;
            this.vy=0;
        }
        if(spacePressed && this.y > this.height * 3) this.flap();       
    }
    draw(){
        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(birdy, this.frameX * this.originialWidth,0,this.originialWidth, this.originalHeight, this.x-20, this.y-20, this.width*1.7, this.height*1.7);
    }
    flap(){//make bird fly
        this.vy -= 2; //giving it a push upwards
        if(this.frameX >=7) this.frameX=0;
        else if (frame%2 ===0) this.frameX++;
        //console.log(this.frameX);
    }
}
const bird = new Bird();
