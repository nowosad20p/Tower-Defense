class Ghost extends Enemy {
    constructor(position, path, delay = 0) {

        super(new BetterImage("ghost", 16, 16, new Vector2(0, 0), 0.3), position, path, delay,15,2);

    }
}