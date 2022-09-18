class Board {

    constructor(map, canvas, fpsCount, moneyCount) {


        //seting up canvas
        this.canvas = canvas;

        //creating needed values
        this.activeTile = null;
        this.board = [];
        this.curUI = [];
        this.width;
        this.height;
        this.enemySpawns = [];
        this.enemies = [];
        this.fpsCount = fpsCount;
        this.coins = 0;
        this.moneyCountDisplay = moneyCount;
        this.paused = false;

        //loading map from string
        this.toLoad = 0;
        this.loadMap(map);
        //creating paths
        this.enemySpawns.forEach(element => {
            this.board[element.x][element.y].findPath(new Vector2(element.x, element.y), this.playerBase, this.board);
        });
        this.board[3][3] = new MageTower();
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerWidth / this.width * this.height;



        //creating needed utils
        this.timeUtils = new TimeUtils();
        this.inputUtils = new InputUtils(this, this.curUI, this.canvas);
        this.drawingUtils = new DrawingUtils(canvas.getContext("2d"), canvas.width, canvas.height, this.width, this.height);

    }
    loadMap(map) {
        //creating arrays
        let cur = "";
        let curArray = [];
        //reading map string
        for (let i = 0; i < map.length; i++) {

            if (isNaN(map[i]) || map[i] == " ") {
                switch (map[i]) {
                    case " ":
                        curArray.push(cur);
                        break;
                    case "w": //board width
                        this.width = cur;

                        break;
                    case "h": //board height
                        this.height = cur;
                        if (this.width != undefined) {
                            for (let i = 0; i < this.width; i++) {
                                let piece = [];
                                for (let j = 0; j < this.height; j++) {


                                    piece.push(new TerrainTile(new BetterImage("./graphics/terrain.png", 32, 32, new Vector2(0, 0))));
                                    this.toLoad++;
                                    piece[j].image.img.onload = () => {
                                        this.toLoad--
                                    }
                                }
                                this.board.push(piece);
                            }

                        }
                        break;
                    case "p": //path
                        curArray.push(cur);

                        this.loadPath(curArray);
                        curArray = [];
                        break;
                    case "s": //enemy spawns
                        curArray.push(cur);
                        this.loadEnemySpawns(curArray);
                        curArray = [];

                        break;
                    case "t": //tower slots
                        curArray.push(cur);
                        this.loadTowerSlots(curArray);
                        curArray = [];

                        break;
                    case "e": //player base
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
        //loading player base
        for (let i = 0; i < base.length; i += 2) {



            this.board[base[i]][base[i + 1]] = new PlayerBase(new BetterImage("./graphics/playerBase.png", 32, 32, new Vector2(0, 0)));
            this.toLoad++;
            this.board[base[i]][base[i + 1]].image.img.onload = () => {
                this.toLoad--
            };

            this.playerBase = new Vector2(base[i], base[i + 1]);
        }
    }
    loadEnemySpawns(enemySpawns) {
        //loading enemy spawns
        for (let i = 0; i < enemySpawns.length; i += 2) {


            this.board[enemySpawns[i]][enemySpawns[i + 1]] = new EnemySpawn(new BetterImage("./graphics/enemySpawn.png", 32, 32, new Vector2(0, 0)), [], this.drawingUtils);
            this.toLoad++;
            this.board[enemySpawns[i]][enemySpawns[i + 1]].image.img.onload = () => {
                this.toLoad--
            };
            this.enemySpawns.push(new Vector2(enemySpawns[i], enemySpawns[i + 1]))
        }
    }
    loadPath(path) {
        //loading path

        for (let i = 0; i < path.length; i += 2) {


            this.board[path[i]][path[i + 1]] = new PathTile(new BetterImage("./graphics/roads.png", 32, 32, new Vector2(0, 0)));
            this.toLoad++;
            this.board[path[i]][path[i + 1]].image.img.onload = () => {
                this.toLoad--
            };
        }
        this.updateBoardTilesGraphic();
    }
    loadTowerSlots(slots) {
        //loading tower slots

        for (let i = 0; i < slots.length; i += 2) {

            this.board[slots[i]][slots[i + 1]] = new TowerSlot(new BetterImage("./graphics/towerSlot.png", 16, 16, new Vector2(0, 0)), this, new Vector2(slots[i], slots[i + 1]));
            this.toLoad++;
            this.board[slots[i]][slots[i + 1]].image.img.onload = () => {
                this.toLoad--
            };
        }
        this.updateBoardTilesGraphic();
    }
    updateBoardTilesGraphic() {
        //updating path directions

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
        if (this.toLoad == 0) {
            //checking if game is paused
            if (!this.paused) {
                //updating time
                this.timeUtils.update();
                this.timeElapsed += this.timeUtils.deltaTime;
                if (this.enemies.length == 0) {
                    //this.sendNextWave();
                }

                //checking if another frame should be displayed
                if (this.timeElapsed > 1000 / this.fpsCount) {


                    for (let i = 0; i < this.board.length; i++) {
                        for (let j = 0; j < this.board[i].length; j++) {
                            this.drawingUtils.drawTile(this.board[i][j], i, j);
                        }
                    }
                    if (this.activeTile != null) {

                        if (this.board[this.activeTile.x][this.activeTile.y] instanceof Tower) {
                            this.drawingUtils.drawTurretRange(this.activeTile.x, this.activeTile.y, this.board);
                            //this.drawingUtils.drawTowerButtons(this.board[this.activeTile.x][this.activeTile.y].towerButtons);
                        }
                        if (this.board[this.activeTile.x][this.activeTile.y] instanceof EnemySpawn) {
                            this.drawingUtils.drawPath(this.board[this.activeTile.x][this.activeTile.y]);
                        }
                        if (this.board[this.activeTile.x][this.activeTile.y] instanceof TowerSlot) {

                            //this.drawingUtils.drawTowerButtons(this.board[this.activeTile.x][this.activeTile.y].towerButtons,new Vector2(this.activeTile.x,this.activeTile.y));
                            this.board[this.activeTile.x][this.activeTile.y].towerButtons.position = new Vector2(this.activeTile.x, this.activeTile.y);

                        }

                    }
                    //drawing UI
                    for (let i = 0; i < this.curUI.length; i++) {
                        if (this.curUI[i] instanceof TowerButtonsContainer) {
                            this.drawingUtils.drawTowerButtons(this.curUI[i], this.curUI[i].position);
                        }
                        if (this.curUI[i] instanceof Button) {
                            this.drawingUtils.drawButton(this.curUI[i])
                        }
                    }
                    //drawing enemies
                    for (let i = 0; i < this.enemies.length; i++) {
                        this.enemies[i].update(this.timeElapsed);
                        this.drawingUtils.drawEntity(this.enemies[i])
                    }
                    //setting time since last frame to 0
                    this.timeElapsed = 0;
                }
            }

        } else {
            //displaying loading text
            this.drawingUtils.drawText("loading...")
        }
        //requesting another frame
        requestAnimationFrame(this.update.bind(this))


    }
    sendNextWave() {

        this.board[this.enemySpawns[0].x][this.enemySpawns[0].y].sendWave(0).forEach(element => {
            this.enemies.push(element)
        });

    }
    updateUI() {
        if (!this.paused) {
            this.curUI = [];
            if (this.activeTile != null) {

                if (this.board[this.activeTile.x][this.activeTile.y] instanceof TowerSlot) {


                    this.curUI.push(this.board[this.activeTile.x][this.activeTile.y].towerButtons);

                }
            }

            this.curUI.push(new Button(new BetterImage("./graphics/towerButtons.png", 16, 16, new Vector2(32, 0)), 16, 16, new Vector2(4, 3), () => {
                this.sendNextWave();
                console.log("ae")
            }))

            //displaying coin count
            this.moneyCountDisplay.innerHTML = "Coins:" + this.coins;

            this.inputUtils.ui = this.curUI;

        }
    }
    startLevel() {

        //starting utilities and update function
        this.updateBoardTilesGraphic();
        this.inputUtils.startListening();


        this.timeElapsed = 0;
    

        this.update();
        this.updateUI();
    }

}