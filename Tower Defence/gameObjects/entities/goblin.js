class Goblin extends Enemy {
    constructor(position, path,delay=0) {

        super(new BetterImage("./graphics/goblin.png", 16, 16, new Vector2(0, 0), 0.2), position, path,delay);

    }
}