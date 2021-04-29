class Astroid{
    constructor(x,y){
        var options = {
            friction: 0.001,
            restitution:0.1           
        }
        this.astroid = Bodies.rectangle(x,y,50,50);
        this.width = 50;
        this.heigh = 50;
        this.image = loadImage("images/ASTROID.png")
        World.add(world, this.astroid);
    }

    updateY(){     
        if(this.astroid.position.y > height){

            Matter.Body.setPosition(this.astroid, {x:random(0,400), y:random(0,400)})
        }
    }

    show(){
        
        fill("blue")
        imageMode(CENTER);
        image(this.image,this.astroid.position.x,this.astroid.position.y,this.width,this.height);
        
    }
}