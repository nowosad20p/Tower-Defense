class Entity {
    constructor(image, position = new Vector2(0, 0), movementSpeed = 0.1) {

        this.image = image;
        this.position = position;

        //entity stats
        this.movementSpeed = movementSpeed;
        this.hp = 10;
        this.maxHp = this.hp;
        this.damage = 100;
        this.armor = 10;

        //entity state
        this.dead = false;
        this.finished = false;
        this.spawned = false;
        this.widthRatio = this.image.width / this.image.height;
        this.heightRatio = this.image.height / this.image.width;

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
        let  board= new Board();
        board.curUI.push(new TemporaryText(new Vector2(this.position.x,this.position.y),damage))
        console.log(board.curUI)
    }
}