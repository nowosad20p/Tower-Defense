class Board {

    constructor(map, waves, canvas, fpsCount, moneyCount, hpCount, pauseMenu,endMenu) {
        if (Board.exists) { //if instance of this object exist return this instance
            return Board.instance;
        }
        Board.exists = true;
        Board.instance = this;

        //seting up canvas
        this.canvas = canvas;
        this.preloadedImages = new PreloadedImages();
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
        this.finished = false;

        //waves settings
        this.timeBetweenWaves = 5000;
        this.curWave = 0;
        this.timeSinceLastWave = 0;
        this.numberOfWaves = 0;

        //loading map from string


        let result = stringToBoard(map, this);
        this.board = result[0];
        this.playerBase = result[1];
        this.enemySpawns = result[2];
        this.width = result[3].x;
        this.height = result[3].y;





        //loading waves
        waves = stringToWave(waves);
       
        this.coins=waves.shift();
        waves.shift()
        

        //creating paths and getting number of waves

        //setting waves
        for (let i = 0; i < waves.length; i += 2) {

            this.board[waves[i].x][waves[i].y].waves = waves[i + 1];
        }

        //doesnt matter
        let actualSpawns = [];
        this.enemySpawns.forEach(element => {
            actualSpawns.push(this.board[element.x][element.y])
        })

        //getting number of waves
        this.enemySpawns.forEach(element => {
            this.board[element.x][element.y].findPath(new Vector2(element.x, element.y), this.playerBase, this.board);
            this.numberOfWaves = Math.max(this.numberOfWaves, this.board[element.x][element.y].waves.length)
        });

        //setting up canvas size
        this.canvas.width = window.innerHeight/ this.width * this.height;
            this.canvas.height = window.innerHeight ;



        //creating  utils
        this.timeUtils = new TimeUtils();
        this.inputUtils = new InputUtils(this, this.curUI, this.canvas);
        this.drawingUtils = new DrawingUtils(canvas.getContext("2d"), canvas.width, canvas.height, this.width, this.height);

        //handling alt tab

        window.onblur = () => {
            if (!this.paused && !this.finished) {
                this.pause();
            }
        }
        window.onresize = () => {
            this.canvas.width = window.innerHeight/ this.width * this.height;
            this.canvas.height = window.innerHeight ;
            this.drawingUtils.resize(this.canvas.width, this.canvas.height);

        }
        //setting up pauseMenu
        this.pauseMenu = pauseMenu;
        this.pauseMenu.style.display = "none";
        this.endMenu=endMenu;
        this.endMenu.style.display = "none";

        return this;
    }
    pause() { //pausing game

        this.drawingUtils.drawRectangle(new Vector2(0, 0), new Vector2(this.canvas.width, this.canvas.height), "rgba(92, 95, 90, 0.5)");
        this.pauseMenu.style.display = "block";
        this.paused = true

    }
    resume() { //resuming game
        this.paused = false;
        this.timeUtils.update();
        this.pauseMenu.style.display = "none";
     

    }
    endGame(result){//ending game, 0 means lose 1 means victory
        this.finished=true;
        this.endMenu.style.display="block";
        if(result){
            this.endMenu.querySelector("h2").innerHTML="You won!";
        }else{
            this.endMenu.querySelector("h2").innerHTML="Game over, get good";

        }
        
    }
    update() {
        if (this.preloadedImages.loaded) {
            //checking if game is paused
            if (!this.paused && !this.finished) {

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
                     //enemies

                     for (let i = 0; i < this.enemies.length; i++) {

                        if (this.enemies[i].dead) { //deleting dead enemies and adding coins for killing enemies
                            this.coins += this.enemies[i].value;
                            this.enemies.splice(i, 1);
                            i--;
                            this.updateUI();

                        } else {

                            if (this.enemies[i].finished) { //deleting enemies that finished their path
                                this.hp -= this.enemies[i].damageToTurret;


                                if (this.hp <= 0) { //checking if player base is destroyed
                                    this.endGame(0);
                                }
                                this.enemies.splice(i, 1);
                                this.updateUI();
                                i--;
                            } else { //updating enemies
                                this.enemies[i].update(this.timeElapsed);
                                //drawing enemies
                                if(this.enemies[i].spawned){
                                this.drawingUtils.drawEntity(this.enemies[i]);
                                }
                            }
                        }

                    }
                    for (let i = 0; i < this.board.length; i++) {
                        for (let j = 0; j < this.board[i].length; j++) {

                            if (this.board[i][j] instanceof Tower) {
                                this.board[i][j].update(this.enemies, this.timeElapsed);
                                if (this.board[i][j].curTarget != null) {
                                    //this.drawingUtils.drawLine(new Vector2(i + 0.5, j + 0.5), this.board[i][j].curTarget.position);

                                }
                                //drawing tower projectiles
                                this.board[i][j].projectiles.forEach(element => {

                                    this.drawingUtils.drawProjectile(element);
                                })
                            }
                        }
                    }
                    if (this.activeTile != null) { //handling active tile

                        if (this.board[this.activeTile.x][this.activeTile.y] instanceof Tower) {
                            this.drawingUtils.drawTurretStats(this.board[this.activeTile.x][this.activeTile.y]);
                            this.drawingUtils.drawTurretRange(this.activeTile.x, this.activeTile.y, this.board);
                            this.board[this.activeTile.x][this.activeTile.y].towerButtons.position = new Vector2(this.activeTile.x, this.activeTile.y);


                        }
                        if (this.board[this.activeTile.x][this.activeTile.y] instanceof EnemySpawn) {

                            this.drawingUtils.drawPath(this.board[this.activeTile.x][this.activeTile.y]);
                        }
                        if (this.board[this.activeTile.x][this.activeTile.y] instanceof TowerSlot) {


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


                        if (this.curUI[i] instanceof TemporaryText) {
                            if (this.curUI[i].readyToDelete) {
                                this.curUI.splice(i, 1);
                                i--;



                            } else {


                                this.drawingUtils.drawText(this.curUI[i].text, "red", this.curUI[i].position)
                                this.curUI[i].update(this.timeElapsed);
                            }

                        }
                    }


                    if (this.enemies.length == 0 && this.curWave != 0) { //sending next waves and checking if player won
                        if (this.curWave == this.numberOfWaves) {
                            this.endGame(1);

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
                    this.curUI.push(new Button(new BetterImage("buttons", 16, 16, new Vector2(112, 0)), 16, 16, pos, () => {
                        this.sendNextWave();

                    }))
                })



            }


            //displaying coin count
            this.moneyCountDisplay.innerHTML = '<div><img src="./graphics/ui/coin.png" alt="coins">:' + this.coins + "</div>";
            this.hpCountDisplay.innerHTML = '<div><img src="./graphics/ui/hp.png" alt="hp">:' + this.hp + "</div>";

            this.inputUtils.ui = this.curUI;

        }
    }
    startLevel() {

        //starting utilities and update loops
        //this.updateBoardTilesGraphic();
        this.inputUtils.startListening();
        this.pauseMenu.style.display="none";


        this.timeElapsed = 0;


        this.update();
        this.updateUI();

    }

}