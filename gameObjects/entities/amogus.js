class Amogus extends Enemy {
    constructor(position, path, delay = 0) {

        super(new BetterImage("amogus", 16, 16, new Vector2(0, 0), 0.5), position, path, delay,200,5,0.05);

    }
}