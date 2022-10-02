class Board {

    constructor(map, canvas, fpsCount, moneyCount, hpCount) {

        //seting up canvas
        this.canvas = canvas;

        //arrays with board content
        this.width;
        this.height;
        this.board = [];
        this.curUI = [];
        this.enemySpawns = [];
        this.enemies = [];
        this.activeTile = null;

        //board settings
        this.fpsCount = fpsCount;

        //player resourses
        this.coins = 200;
        this.hp = 5;

        //containters to display player information
        this.moneyCountDisplay = moneyCount;
        this.hpCountDisplay = hpCount;

        //game states
        this.paused = false;

        //waves settings
        this.timeBetweenWaves = 5000;
        this.curWave = 0;
        this.timeSinceLastWave = 0;
        this.numberOfWaves = 0;

        //loading map from string
        this.toLoad = 0;
        this.loadMap(map);

        //creating paths and getting number of waves
        this.enemySpawns.forEach(element => {
            this.board[element.x][element.y].findPath(new Vector2(element.x, element.y), this.playerBase, this.board);
            this.numberOfWaves = Math.max(this.numberOfWaves, this.board[element.x][element.y].waves.length)
        });

        //setting up canvas size
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerWidth / this.width * this.height;



        //creating needed utils
        this.timeUtils = new TimeUtils();
        this.inputUtils = new InputUtils(this, this.curUI, this.canvas);
        this.drawingUtils = new DrawingUtils(canvas.getContext("2d"), canvas.width, canvas.height, this.width, this.height);

        //handling alt tab
        window.onfocus = () => {
            this.resume()
        }
        window.onblur = () => {
            this.pause()
        }

    }
    pause() { //pausing game

        this.drawingUtils.drawRectangle(new Vector2(0, 0), new Vector2(this.canvas.width, this.canvas.height), "rgba(92, 95, 90, 0.5)");
        console.log("pauza moment")
        this.paused = true

    }
    resume() { //resuming game
        this.paused = false;
        this.timeUtils.update();


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


                                    piece.push(new TerrainTile());
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



            this.board[base[i]][base[i + 1]] = new PlayerBase();
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


            this.board[enemySpawns[i]][enemySpawns[i + 1]] = new EnemySpawn([], this.drawingUtils);
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


            this.board[path[i]][path[i + 1]] = new PathTile();
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
                    for (let i = 0; i < this.board.length; i++) {
                        for (let j = 0; j < this.board[i].length; j++) {

                            if (this.board[i][j] instanceof Tower) {
                                this.board[i][j].update(this.enemies, this.timeElapsed);
                                if (this.board[i][j].curTarget != null) {
                                    this.drawingUtils.drawLine(new Vector2(i + 0.5, j + 0.5), this.board[i][j].curTarget.position);

                                }
                            }
                        }
                    }
                    if (this.activeTile != null) {

                        if (this.board[this.activeTile.x][this.activeTile.y] instanceof Tower) {
                            this.drawingUtils.drawTurretRange(this.activeTile.x, this.activeTile.y, this.board);
                            this.board[this.activeTile.x][this.activeTile.y].towerButtons.position = new Vector2(this.activeTile.x, this.activeTile.y);

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
                    //drawing enemies and checking their state

                    for (let i = 0; i < this.enemies.length; i++) {

                        if (this.enemies[i].dead) { //deleting dead enemies and adding coins for killing enemies
                            this.coins += this.enemies[i].value;
                            this.enemies.splice(i, 1);

                            this.updateUI();

                        } else {

                            if (this.enemies[i].finished) { //deleting enemies that finished their path
                                this.hp -= this.enemies[i].damageToTurret;

                                if (this.hp <= 0) { //checking if player base is destroyed
                                    this.gameOver();
                                }
                                this.enemies.splice(i, 1);
                                this.updateUI();
                            } else { //updating enemies
                                this.enemies[i].update(this.timeElapsed);
                                this.drawingUtils.drawEntity(this.enemies[i]);
                            }
                        }

                    }



                    if (this.enemies.length == 0 && this.curWave != 0) { //sending next waves and checking if player won
                        if (this.curWave == this.numberOfWaves) {
                            this.win();

                        } else {

                            if (this.timeSinceLastWave > this.timeBetweenWaves) {
                                this.sendNextWave();
                            } else {
                                this.timeSinceLastWave += this.timeElapsed;

                            }
                        }

                    }
                    //setting time since last frame to 0
                    this.timeElapsed = 0;
                }
            } else { //if game is paused

            }

        } else {
            //displaying loading text
            this.drawingUtils.drawText("loading... images left: " + this.toLoad);
        }

        //requesting another frame
        requestAnimationFrame(this.update.bind(this))


    }
    gameOver() { //game over function
        this.drawingUtils.drawText("Pozdro poćwicz");

        this.paused = true;
    }
    win() { //win function
        this.drawingUtils.drawText("Kurde poćwiczył i wygrał");

        this.paused = true;
    }
    sendNextWave() {
        //sending waves and saving spawned enemies in enemies array
        this.enemySpawns.forEach(element => {
            this.board[element.x][element.y].sendWave(this.curWave).forEach(enemy => {
                this.enemies.push(enemy)
            })
        })

        this.curWave++;
        this.updateUI();
        this.timeSinceLastWave = 0;

    }
    updateUI() {
        if (!this.paused) {
            this.curUI = [];
            if (this.activeTile != null) { //drawing active tile ui if needed to

                if (this.board[this.activeTile.x][this.activeTile.y] instanceof TowerSlot || this.board[this.activeTile.x][this.activeTile.y] instanceof Tower) {


                    this.curUI.push(this.board[this.activeTile.x][this.activeTile.y].towerButtons);

                }
            }
            if (this.enemies.length == 0) {
                //if there are no enemies left, show buttons to summon next wave
                this.enemySpawns.forEach(element => {
                    let pos = Object.create(element)
                    pos.offset(0.5);
                    this.curUI.push(new Button(new BetterImage("./graphics/buttons.png", 16, 16, new Vector2(96, 0)), 16, 16, pos, () => {
                        this.sendNextWave();

                    }))
                })



            }


            //displaying coin count
            this.moneyCountDisplay.innerHTML = '<div><img src="./graphics/coin.png" alt="coins">:' + this.coins + "</div>";
            this.hpCountDisplay.innerHTML = '<div><img src="./graphics/hp.png" alt="hp">:' + this.hp + "</div>";

            this.inputUtils.ui = this.curUI;

        }
    }
    startLevel() {

        //starting utilities and update loops
        this.updateBoardTilesGraphic();
        this.inputUtils.startListening();


        this.timeElapsed = 0;


        this.update();
        this.updateUI();
    }

}