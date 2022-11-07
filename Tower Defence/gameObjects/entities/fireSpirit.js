class FireSpirit extends Enemy {
    constructor(position, path, delay = 0) {

        super(new BetterImage("fireSpirit", 16, 16, new Vector2(0, 0), 0.3), position, path, delay);

    }
}