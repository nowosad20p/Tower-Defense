class TowerSlot extends Tile {
    constructor(image,board,position) {
        super(image);
        this.startingPointOfImage = new Vector2(0, 0);

        this.tileWidth = 16;
        this.tileHeight = 16;
        
        this.towerButtons = new TowerButtonsContainer(0.5,
            [
                new Button(new BetterImage("./graphics/towerButtons.png", 16, 16, new Vector2(32, 0)), 16, 16, new Vector2(0, 0), () => {
                    board.board[position.x*1][position.y*1]=new Tower(1, undefined, 1, new BetterImage("./graphics/mageTower.png", 32, 32, new Vector2(0, 0)), 2, 0) ;
                   
                    board.activeTile=null;
                }),
                new Button(new BetterImage("./graphics/towerButtons.png", 16, 16, new Vector2(48, 0)), 16, 16, new Vector2(0, 0), () => {
                    board.board[position.x*1][position.y*1]=new Tower(1, undefined, 1, new BetterImage("./graphics/mageTower.png", 32, 32, new Vector2(0, 0)), 2, 0) ;
                   
                    board.activeTile=null;
                }),
                new Button(new BetterImage("./graphics/towerButtons.png", 16, 16, new Vector2(64, 0)), 16, 16, new Vector2(0, 0), () => {
                    board.board[position.x*1][position.y*1]=new Tower(1, undefined, 1, new BetterImage("./graphics/mageTower.png", 32, 32, new Vector2(0, 0)), 2, 0) ;
                   
                    board.activeTile=null;
                }),
                new Button(new BetterImage("./graphics/towerButtons.png", 16, 16, new Vector2(80, 0)), 16, 16, new Vector2(0, 0), () => {
                    board.board[position.x*1][position.y*1]=new Tower(1, undefined, 1, new BetterImage("./graphics/mageTower.png", 32, 32, new Vector2(0, 0)), 2, 0) ;
                   
                    board.activeTile=null;
                })
            ]

        );
        console.log(this.towerButtons.buttons)
    }
}