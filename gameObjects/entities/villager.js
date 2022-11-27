class Villager extends Enemy{
    constructor(position, path, delay = 0) {

        super(new BetterImage("villager", 16, 16, new Vector2(0, 0), 0.2), position, path, delay,10,1);
        this.hp=15;
        this.damageToTurret=1;
        this.movementSpeed=0.1;
    }
}