class CanonBall extends Projectile {
    constructor(position, target, speed, damage, damageType, enemies, size = 0.5) {
        super(new BetterImage("canonBall", 8, 8, new Vector2(0, 0), 0.25), position);
        this.size = size;
        this.target = new Enemy(new BetterImage("canonBall", target.image.width,  target.image.height, new Vector2(0, 0), target.image.size), new Vector2(target.position.x,target.position.y), [new Vector2(0, 0)], 0);
        //calculating real target position
      

        this.target.position.x=this.target.position.x+(this.target.size * this.target.widthRatio/2);
        this.target.position.y=  this.target.position.y+(this.target.size * this.target.heightRatio/2);
        this.speed = speed;

        this.damage = damage;
        this.damageType = damageType;
        this.finished = false;


        this.enemies = enemies;
    }
    update(deltaTime) {

        this.animator.update(deltaTime);

        //updating position
        this.movementVector = directionVectorPercents(this.position, this.target.position); //vector with percentage which defines how much of ms should go to x and y pos

        this.position.x += this.speed * this.movementVector.x * (deltaTime / 1000);
        this.position.y += this.speed * this.movementVector.y * (deltaTime / 1000);

        //checking if reached destination
        let leftTop = new Vector2(
            this.position.x - (this.size),
            this.position.y - (this.size)
        );
        let rightBot = new Vector2(
            this.position.x + (this.size),
            this.position.y + (this.size)
        );

        if (pointIntersectRectangle(this.target.position, leftTop, rightBot)) {

            //dealing damage to nearby enemies
            this.enemies.forEach(element => {
                let enemyRightBot = new Vector2(
                    element.position.x + element.size * element.widthRatio,
                    element.position.y + element.size * element.heightRatio
                );
                if (rectanglesIntersect(leftTop, rightBot, element.position, enemyRightBot)) {
                    element.takeDamage(this.damage, this.damageType);
                }
            });
            this.finished = true;
        }


    }
}