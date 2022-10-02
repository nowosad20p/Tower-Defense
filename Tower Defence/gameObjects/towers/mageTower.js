class MageTower extends Tower {
    constructor(position, board, price) {


        super(1, price, 1, new BetterImage("./graphics/mageTower.png", 32, 32, new Vector2(0, 0)), 1.5, 5, 2, position, board);

    }

}