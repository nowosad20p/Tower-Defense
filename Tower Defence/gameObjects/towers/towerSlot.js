class TowerSlot extends Tile {
    constructor(board, position) {
        super(new BetterImage("towerSlot", 32, 32, new Vector2(0, 0)));
        this.startingPointOfImage = new Vector2(0, 0);

        this.tileWidth = 32;
        this.tileHeight = 32;
        this.board = board;
        //creating buttons to display on click
        this.towerButtons = new TowerButtonsContainer(0.5,
            [
                new Button(new BetterImage("buttons", 16, 16, new Vector2(32, 0)), 16, 16, new Vector2(0, 0), () => {
                    let price = 100;

                    if (price <= this.board.coins) {
                        board.board[position.x * 1][position.y * 1] = new MageTower(position, board, price); //mag



                        this.board.coins -= price;


                    } else {

                    }
                }),
                new Button(new BetterImage("buttons", 16, 16, new Vector2(48, 0)), 16, 16, new Vector2(0, 0), () => {
                    let price = 100;
                    if (price <= this.board.coins) {
                        board.board[position.x * 1][position.y * 1] = new ArcherTower(position, board, price); //łuk


                        this.board.coins -= price;
                    } else {

                    }
                }),
//                 new Button(new BetterImage("buttons", 16, 16, new Vector2(64, 0)), 16, 16, new Vector2(0, 0), () => {
//                     let price = 100;
//                     if (price <= this.board.coins) {
//                         board.board[position.x * 1][position.y * 1] = new TrooperTower(position, board, price); //ludziki


//                         this.board.coins -= price;
//                     } else {

//                     }
//                 }),
                new Button(new BetterImage("buttons", 16, 16, new Vector2(80, 0)), 16, 16, new Vector2(0, 0), () => {
                    let price = 100;
                    if (price <= this.board.coins) {
                        board.board[position.x * 1][position.y * 1] = new IceTower(position, board, price); //ice tower button



                        this.board.coins -= price;
                    } else {

                    }
                }),
                new Button(new BetterImage("buttons", 16, 16, new Vector2(96, 0)), 16, 16, new Vector2(0, 0), () => {
                    let price = 100;
                    if (price <= this.board.coins) {
                        board.board[position.x][position.y] = new Mortar(position, board, price); //ice tower button



                        this.board.coins -= price;
                    } else {

                    }
                })
            ]

        );

    }
}
