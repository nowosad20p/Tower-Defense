class Goblin extends Enemy {
    constructor(position, path, delay = 0) {

        super(new BetterImage("goblin", 16, 16, new Vector2(0, 0), 0.3), position, path, delay);

    }
}