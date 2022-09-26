class IceTower extends Tower {
    constructor(position, board, price) {

        super(1, price, 1, new BetterImage("./graphics/iceTower.png", 32, 32, new Vector2(0, 0)), 2, 10, position, board);

    }

}