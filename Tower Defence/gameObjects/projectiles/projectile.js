class Projectile{
    constructor(image,position,target, speed, damage, damageType){
        this.position=position;
        this.target=target;
        this.speed=speed;
        this.damage=damage;
        this.damageType=damageType;
        this.image=image;
        this.finished=false;
    }
    update(deltaTime){
        
        let movementVector=directionVectorPercents(this.position,this.target.position);
      
        this.position.x+=this.speed*movementVector.x*(deltaTime/1000);
        this.position.y+=this.speed*movementVector.y*(deltaTime/1000);
        let rightBot= new Vector2(
            this.target.position.x+(this.target.size*this.target.widthRatio),
            this.target.position.y+(this.target.size*this.target.heightRatio),

        );
        if(pointIntersectRectangle(this.position,this.target.position,rightBot)){
            this.target.takeDamage(this.damage,this.damageType);
            this.finished=true;
        }

        if(this.target.dead){
            this.finished=true;
        }
    }
}