class Board {

    constructor(map, canvas, fpsCount) {

        this.fpsCount = fpsCount;
        this.canvas = canvas;
        this.activeTile = null;
        this.board = [];
        this.curUI = [];
        this.width;
        this.height;
        this.enemySpawns = [];
        this.loadMap(map);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerWidth / this.width * this.height;




        this.timeUtils= new TimeUtils();
        this.inputUtils = new InputUtils(this, this.curUI, this.canvas);
        this.drawingUtils = new DrawingUtils(canvas.getContext("2d"), canvas.width, canvas.height, this.width, this.height);

    }
    loadMap(map) {

        let cur = "";
        let curArray = [];
        for (let i = 0; i < map.length; i++) {

            if (isNaN(map[i]) || map[i] == " ") {
                switch (map[i]) {
                    case " ":
                        curArray.push(cur);
                        break;
                    case "w":
                        this.width = cur;

                        break;
                    case "h":
                        this.height = cur;
                        if (this.width != undefined) {
                            for (let i = 0; i < this.width; i++) {
                                let piece = [];
                                for (let j = 0; j < this.height; j++) {
                                    let image = new Image();
                                    image.src = "./graphics/terrain.png";

                                    piece.push(new TerrainTile(image));

                                }
                                this.board.push(piece);
                            }

                        }
                        break;
                    case "p":
                        curArray.push(cur);

                        this.loadPath(curArray);
                        curArray = [];
                        break;
                    case "s":
                        curArray.push(cur);
                        this.loadEnemySpawns(curArray);
                        curArray = [];

                        break;
                    case "t":
                        curArray.push(cur);
                        this.loadTowerSlots(curArray);
                        curArray = [];

                        break;
                    case "e":
                        curArray.push(cur);
                        this.loadPlayerBase(curArray);
                        curArray = [];

                        break;
                }
                cur = "";
            } else {
                cur += map[i];
            }
        }

    }
    loadPlayerBase(base) {
        for (let i = 0; i < base.length; i += 2) {
            let image = new Image();
            image.src = "./graphics/playerBase.png";


            this.board[base[i]][base[i + 1]] = new PlayerBase(image);
            this.playerBase = new Vector2(base[i], base[i + 1]);
        }
    }
    loadEnemySpawns(enemySpawns) {
        for (let i = 0; i < enemySpawns.length; i += 2) {
            let image = new Image();
            image.src = "./graphics/enemySpawn.png";


            this.board[enemySpawns[i]][enemySpawns[i + 1]] = new EnemySpawn(image, [], this.drawingUtils);
            this.enemySpawns.push(new Vector2(enemySpawns[i], enemySpawns[i + 1]))
        }
    }
    loadPath(path) {
        for (let i = 0; i < path.length; i += 2) {
            let image = new Image();
            image.src = "./graphics/roads.png";


            this.board[path[i]][path[i + 1]] = new PathTile(image);
        }
        this.updateBoardTilesGraphic();
    }
    loadTowerSlots(slots) {
        for (let i = 0; i < slots.length; i += 2) {
            let image = new Image();
            image.src = "./graphics/towerSlot.png";
            this.board[slots[i]][slots[i + 1]] = new TowerSlot(image);
        }
        this.updateBoardTilesGraphic();
    }
    updateBoardTilesGraphic() {
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
    update() {
      
        this.timeUtils.update();
        this.timeElapsed+=this.timeUtils.deltaTime;
        if(this.timeElapsed>1000/this.fpsCount){
         
            this.timeElapsed=0;
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                this.drawingUtils.drawTile(this.board[i][j], i, j);
            }
        }
        if (this.activeTile != null) {
            if (this.board[this.activeTile.x][this.activeTile.y] instanceof Tower) {
                this.drawingUtils.drawTurretRange(this.activeTile.x, this.activeTile.y, this.board);
            }
            if (this.board[this.activeTile.x][this.activeTile.y] instanceof EnemySpawn) {
                this.drawingUtils.drawPath(this.board[this.activeTile.x][this.activeTile.y]);
            }
        }
        for (let i = 0; i < this.curUI.length; i++) {

        }
    }
        requestAnimationFrame(this.update.bind(this))


    }
    startLevel() {


        this.updateBoardTilesGraphic();
        this.inputUtils.startListening();

        this.board[0][0].findPath(this.enemySpawns[0], this.playerBase, this.board);
        this.timeElapsed=0;
       this.update()

    }

}