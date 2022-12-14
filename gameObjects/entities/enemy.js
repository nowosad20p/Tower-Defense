class Enemy extends Entity {
    constructor(image, position = new Vector2(0, 0), path, delay,hp=10,damage=1,movementSpeed=0.1) {
        super(image, Object.create(position),movementSpeed,hp,damage);
        this.path = [];
        path.forEach(element => {

            this.path.push(Object.create(element));
        });
        this.xDir = Math.sign(this.path[0].x - this.position.x);
        this.yDir = Math.sign(this.path[0].y - this.position.y);


        this.offset = (Math.random() * (0.25+this.image.size-0.75) + 0.75).toFixed(2);
       
        this.wasOffset = false;
        this.prevPosition = new Vector2();
        this.prevPath = [];
        this.dead = false;

        this.value = 10;
        this.damageToTurret = damage;
        this.path.forEach(element => {
            element.offset(this.offset);
        });
        this.delay = delay;
        this.timeWaited = 0;
        this.size = this.image.size;
        this.xDir;
        this.yDir;
      
    }

    die() {

    }
    update(time) {
    
        this.animator.update(time);
                    
              
        let movementMultiplier = 1;
        let i = 0;
        this.curEffects.forEach(element => {
            if (element instanceof Slow) {
                movementMultiplier *= (1 - element.slowStrength);
            }
            if (element.finished) {
                this.curEffects.splice(i, 1);
                i--;
            }
            if (element instanceof Fire) {
                if (element.tick > element.timeElapsed) {
                    this.takeDamage(element.damage, "fire");
                    element.timeElapsed = 0;
                }
            }
            i++;
            element.update(time);
        })

        if (this.spawned) {

            if (this.hp <= 0) {

                this.dead = true;
                this.die()
                return false;
            }

            if ((this.position.x == this.path[0].x && this.position.y == this.path[0].y) || (this.position.x == this.prevPosition.x && this.position.y == this.prevPosition.y)) {
                this.prevPath.push(this.path.shift());
                if (this.path.length == 0) {
                    this.finished = true;
                    return false;
                }
                this.xDir = Math.sign(this.path[0].x - this.position.x);
                this.yDir = Math.sign(this.path[0].y - this.position.y);

            }



            this.prevPosition.x = this.position.x;
            this.prevPosition.y = this.position.y;
            let x = (this.path[0].x - this.position.x).toFixed(5)
            let y = (this.path[0].y - this.position.y).toFixed(5)

            movementMultiplier *= (time / 100 * this.movementSpeed).toFixed(5);
            x >= 0 ? this.position.x += Math.ceil(x) * movementMultiplier : this.position.x += Math.floor(x) * movementMultiplier;
            y >= 0 ? this.position.y += Math.ceil(y) * movementMultiplier : this.position.y += Math.floor(y) * movementMultiplier;

            if (this.xDir == -1) {
                if (this.position.x < this.path[0].x) {
                    this.position.x = this.path[0].x;
                }
            } else {
                if (this.position.x > this.path[0].x) {
                    this.position.x = this.path[0].x;
                }
            }
            if (this.yDir == -1) {
                if (this.position.y < this.path[0].y) {
                    this.position.y = this.path[0].y;;
                }
            } else {
                if (this.position.y > this.path[0].y) {
                    this.position.y = this.path[0].y;
                }
            }
            

        } else {
            if (this.timeWaited >= this.delay) {
                this.spawned = true;
            } else {
                this.timeWaited += time;
            }
        }
    }
}