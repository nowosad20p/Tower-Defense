class Orc extends Enemy{
    constructor(position, path, delay = 0) {

        super(new BetterImage("orc", 16, 16, new Vector2(0, 0), 0.4), position, path, delay);
        this.hp=40;
        this.damageToTurret=2;
        this.movementSpeed=0.1;
    }
}