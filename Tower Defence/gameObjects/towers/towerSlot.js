class TowerSlot extends Tile {
    constructor(image, board, position) {
        super(image);
        this.startingPointOfImage = new Vector2(0, 0);

        this.tileWidth = 16;
        this.tileHeight = 16;
        this.board = board;
        //creating buttons to display on click
        this.towerButtons = new TowerButtonsContainer(0.5,
            [
                new Button(new BetterImage("./graphics/towerButtons.png", 16, 16, new Vector2(32, 0)), 16, 16, new Vector2(0, 0), () => {
                    let price = 100;

                    if (price <= this.board.coins) {
                        board.board[position.x * 1][position.y * 1] = new MageTower(position, board, price); //mag

                        board.activeTile = null;
                        this.board.coins -= price;
                    } else {

                    }
                }),
                new Button(new BetterImage("./graphics/towerButtons.png", 16, 16, new Vector2(48, 0)), 16, 16, new Vector2(0, 0), () => {
                    let price = 100;
                    if (price <= this.board.coins) {
                        board.board[position.x * 1][position.y * 1] = new ArcherTower(position, board, price); //łuk

                        board.activeTile = null;
                        this.board.coins -= price;
                    } else {

                    }
                }),
                new Button(new BetterImage("./graphics/towerButtons.png", 16, 16, new Vector2(64, 0)), 16, 16, new Vector2(0, 0), () => {
                    let price = 100;
                    if (price <= this.board.coins) {
                        board.board[position.x * 1][position.y * 1] = new TrooperTower(position, board, price); //ludziki

                        board.activeTile = null;
                        this.board.coins -= price;
                    } else {

                    }
                }),
                new Button(new BetterImage("./graphics/towerButtons.png", 16, 16, new Vector2(80, 0)), 16, 16, new Vector2(0, 0), () => {
                    let price = 100;
                    if (price <= this.board.coins) {
                        board.board[position.x * 1][position.y * 1] = new IceTower(position, board, price); //ice tower button

                        board.activeTile = null;

                        this.board.coins -= price;
                    } else {

                    }
                })
            ]

        );

    }
}