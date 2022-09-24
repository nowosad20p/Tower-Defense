class Goblin extends Enemy {
    constructor(position, path) {

        super(new BetterImage("./graphics/goblin.png", 16, 16, new Vector2(0, 0), 0.2), position, path);

    }
}