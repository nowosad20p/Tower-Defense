class BoardCreator {
    constructor(canvas, width, height, fpsCount = 30) {
        //setting canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth / width * height;
        this.canvas = canvas;
        //creating and starting needed utils
        this.timeUtils = new TimeUtils();
        this.inputUtils = new InputUtils(this, [], canvas);
        this.inputUtils.startListening();
        this.drawingUtils = new DrawingUtils(canvas.getContext("2d"), canvas.width, canvas.height, width, height);
        //setting object values
        this.board = [];
        this.width = width;
        this.height = height;
        this.activeTile = null;

        let img = new Image();

        this.fpsCount = fpsCount


        this.tileToSet = new PathTile(img);
        for (let i = 0; i < width; i++) {
            let piece = [];
            for (let j = 0; j < height; j++) {



                piece.push(new TerrainTile(new BetterImage("./graphics/terrain.png", 32, 32, new Vector2(0, 0))));
            }
            this.board.push(piece)
        }
        this.timeElapsed = 0;
        this.update();
    }
    update() {
        //updating time elapsed since last frame
        this.timeUtils.update();
        this.timeElapsed += this.timeUtils.deltaTime;
        //checking if next frame should be displayed
        if (this.timeElapsed > 1000 / this.fpsCount) {
            console.log(this.board)
            this.timeElapsed = 0;
            //based on tile chosen in input utils setting tile
            if (this.activeTile != null) {

                switch (this.tileToSet) {
                    case "terrain":


                        this.board[this.activeTile.x][this.activeTile.y] = new TerrainTile(new BetterImage("./graphics/terrain.png", 32, 32, new Vector2(0, 0)))
                        break;
                    case "path":

                        this.board[this.activeTile.x][this.activeTile.y] = new PathTile(new BetterImage("./graphics/roads.png", 32, 32, new Vector2(0, 0)));
                        break;
                    case "camp":


                        this.board[this.activeTile.x][this.activeTile.y] = new EnemySpawn(new BetterImage("./graphics/enemySpawn.png", 32, 32, new Vector2(0, 0)), [], this.drawingUtils);
                        break;
                    case "base":


                        this.board[this.activeTile.x][this.activeTile.y] = new PlayerBase(new BetterImage("./graphics/playerBase.png", 32, 32, new Vector2(0, 0)));
                        break;
                    case "tower":


                        this.board[this.activeTile.x][this.activeTile.y] = new TowerSlot(new BetterImage("./graphics/towerSlot.png", 16, 16, new Vector2(0, 0)), this, new Vector2(this.activeTile.x, this.activeTile.y));
                        break;
                    default:
                        console.log("pozdro poćwicz")
                }
                this.activeTile = null;
                //updating path directions
                this.updateBoardTilesGraphic();
            }
            //drawing board
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board[i].length; j++) {

                    this.drawingUtils.drawTile(this.board[i][j], i, j);

                }
            }
            this.drawingUtils.drawGrid();
        }
        //getting another frame
        requestAnimationFrame(this.update.bind(this))


    }
    updateUI() {
        
    }
    updateBoardTilesGraphic() {
        //setting correct graphic for path tile
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] instanceof PathTile) {
                    let left = i > 0 ? this.board[i - 1][j] : undefined;

                    let top = j > 0 ? this.board[i][j - 1] : undefined;

                    let right = i < this.width - 1 ? this.board[i + 1][j] : undefined;
                    let bottom = j < this.height - 1 ? this.board[i][j + 1] : undefined;


                    this.board[i][j].setCorrectTile(left, right, top, bottom)
                }
            }
        }
    }
    generateMapCode() {
        //creating arrays
        let map = "";
        let towers = [];
        let path = [];

        let camps = [];
        let playerBase;
        //adding vectors with tiles coordinates to correct arrays
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {

                if (this.board[i][j] instanceof PathTile) {
                    path.push(new Vector2(i, j));
                }
                if (this.board[i][j] instanceof PlayerBase) {
                    playerBase = new Vector2(i, j);

                }
                if (this.board[i][j] instanceof EnemySpawn) {
                    camps.push(new Vector2(i, j));

                }
                if (this.board[i][j] instanceof TowerSlot) {
                    towers.push(new Vector2(i, j));

                }
            }
        }
        //writing array content to string readable by importing function
        map += this.width + "w" + this.height + "h";
        path.forEach(element => {
            map += element.x + " " + element.y + " ";
        });
        map = map.slice(0, -1)

        map += "p";
        towers.forEach(element => {
            map += element.x + " " + element.y + " ";
        });
        map = map.slice(0, -1)
        map += "t";

        camps.forEach(element => {
            map += element.x + " " + element.y + " ";
        });
        map = map.slice(0, -1)

        map += "s";
        map += playerBase.x + " " + playerBase.y + "e";
        //returning result
        return map;
    }
}