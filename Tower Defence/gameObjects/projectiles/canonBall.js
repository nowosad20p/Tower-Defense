class CanonBall extends Projectile {
    constructor(position, target, speed, damage, damageType,enemies) {
        super(new BetterImage("./graphics/projectiles/cannonBall.png", 8, 8, new Vector2(0, 0), 0.25),position);
        this.size=target.size;
        this.target = Object.create(target.position);
        this.speed = speed;
        this.damage = damage;
        this.damageType = damageType;
        this.finished = false;
     
        this.enemies=enemies;
    }
    update(deltaTime) {

        let movementVector = directionVectorPercents(this.position, this.target);

        this.position.x += this.speed * movementVector.x * (deltaTime / 1000);
        this.position.y += this.speed * movementVector.y * (deltaTime / 1000);
        let leftTop=new Vector2(
            this.position.x - (this.size * 0.5),
            this.position.y - (this.size * 0.5)
        );
        let rightBot = new Vector2(
            this.position.x + (this.size * 0.5),
            this.position.y + (this.size * 0.5)
        );
        if (pointIntersectRectangle(this.target, leftTop, rightBot)) {
            
            this.enemies.forEach(element => {           
                let enemyRightBot = new Vector2(
                    element.position.x+element.size*element.widthRatio,
                    element.position.y+element.size*element.heightRatio
                );
                if(rectanglesIntersect(leftTop,rightBot,element.position,enemyRightBot)){
                    element.takeDamage(this.damage,this.damageType);
                }
            });
            this.finished = true;
        }

        if (this.target.dead || this.target.finished) {
            this.finished = true;
        }
    }
}