class ArcherTower extends Tower {
    constructor(position, board, price) {

        super(1, price, 1, new BetterImage("./graphics/archerTower.png", 32, 32, new Vector2(0, 0)), 2.5, 7, 6, position, board);

    }

}