class Entity {
    constructor(image, position = new Vector2(0, 0), movementSpeed = 0.1) {
        this.image = image;
        this.position = position;
        this.movementSpeed = movementSpeed;
        //entity stats
        this.hp = 10;
        this.damage = 100;
        this.armor = 10;
        //entity state
        this.dead = false;
        this.finished = false;
        this.spawned = false;
    }
    spawn() {


    }
    die() {
        this.dead = true;
    }
    takeDamage(damage, damageType) {
        
        this.hp -= damage;
        if (this.hp <= 0) {
     
            this.die()
        }
    }
}