class Board {

    constructor(map, canvas, fpsCount) {
        
    
        //seting up canvas
        this.canvas = canvas;
    
        //creating needed values
        this.activeTile = null;
        this.board = [];
        this.curUI = [];
        this.width;
        this.height;
        this.enemySpawns = [];
        this.enemies=[];
        this.fpsCount = fpsCount;
        //loading map from string
        this.loadMap(map);
        
        this.board[3][3]=new Tower(1,undefined,1,new BetterImage("./graphics/mageTower.png",32,32,new Vector2(0,0)),2,0);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerWidth / this.width * this.height;



        //creating needed utils
        this.timeUtils= new TimeUtils();
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
                    case "w":
                        this.width = cur;

                        break;
                    case "h":
                        this.height = cur;
                        if (this.width != undefined) {
                            for (let i = 0; i < this.width; i++) {
                                let piece = [];
                                for (let j = 0; j < this.height; j++) {
                              

                                    piece.push(new TerrainTile(new BetterImage("./graphics/grass.png",32,32,new Vector2(0,0))));

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
        //loading player base
        for (let i = 0; i < base.length; i += 2) {
            


            this.board[base[i]][base[i + 1]] = new PlayerBase(new BetterImage("./graphics/playerBase.png",32,32,new Vector2(0,0)));
            this.playerBase = new Vector2(base[i], base[i + 1]);
        }
    }
    loadEnemySpawns(enemySpawns) {
          //loading enemy spawns
        for (let i = 0; i < enemySpawns.length; i += 2) {
          

            this.board[enemySpawns[i]][enemySpawns[i + 1]] = new EnemySpawn(new BetterImage("./graphics/enemySpawn.png",32,32,new Vector2(0,0)), [], this.drawingUtils);
            this.enemySpawns.push(new Vector2(enemySpawns[i], enemySpawns[i + 1]))
        }
    }
    loadPath(path) {
          //loading path

        for (let i = 0; i < path.length; i += 2) {
       

            this.board[path[i]][path[i + 1]] = new PathTile(new BetterImage("./graphics/roads.png",32,32,new Vector2(0,0)));
        }
        this.updateBoardTilesGraphic();
    }
    loadTowerSlots(slots) {
          //loading tower slots

        for (let i = 0; i < slots.length; i += 2) {
         
            this.board[slots[i]][slots[i + 1]] = new TowerSlot(new BetterImage("./graphics/towerSlot.png",16,16,new Vector2(0,0)));
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
       
        //updating time
        this.timeUtils.update();
        this.timeElapsed+=this.timeUtils.deltaTime;
        if(this.enemies.length==0){
            this.enemies.push(this.board[this.enemySpawns[0].x][this.enemySpawns[0].y].sendWave(0));
        }
        //checking if another frame should be displayed
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
                //this.drawingUtils.drawTowerButtons(this.board[this.activeTile.x][this.activeTile.y].towerButtons);
            }
            if (this.board[this.activeTile.x][this.activeTile.y] instanceof EnemySpawn) {
                this.drawingUtils.drawPath(this.board[this.activeTile.x][this.activeTile.y]);
            }
            if (this.board[this.activeTile.x][this.activeTile.y] instanceof TowerSlot) {
              
                //this.drawingUtils.drawTowerButtons(this.board[this.activeTile.x][this.activeTile.y].towerButtons,new Vector2(this.activeTile.x,this.activeTile.y));
                this.board[this.activeTile.x][this.activeTile.y].towerButtons.position=new Vector2(this.activeTile.x,this.activeTile.y);
               
            }
          
        }
        for (let i = 0; i < this.curUI.length; i++) {
            this.drawingUtils.drawTowerButtons(this.curUI[0],this.curUI[0].position);
        }
    }
    //requesting another frame
        requestAnimationFrame(this.update.bind(this))


    }
    updateUI(){
        this.curUI=[];
        if (this.activeTile != null) {
            // if (this.board[this.activeTile.x][this.activeTile.y] instanceof Tower) {
            //     this.drawingUtils.drawTurretRange(this.activeTile.x, this.activeTile.y, this.board);
            //     //this.drawingUtils.drawTowerButtons(this.board[this.activeTile.x][this.activeTile.y].towerButtons);
            // }
            // if (this.board[this.activeTile.x][this.activeTile.y] instanceof EnemySpawn) {
            //     this.drawingUtils.drawPath(this.board[this.activeTile.x][this.activeTile.y]);
            // }
            if (this.board[this.activeTile.x][this.activeTile.y] instanceof TowerSlot) {
              
                //this.drawingUtils.drawTowerButtons(this.board[this.activeTile.x][this.activeTile.y].towerButtons,new Vector2(this.activeTile.x,this.activeTile.y));
                //this.board[this.activeTile.x][this.activeTile.y].towerButtons.position=new Vector2(this.activeTile.x,this.activeTile.y);
                this.curUI.push(this.board[this.activeTile.x][this.activeTile.y].towerButtons);
               
            }
        }
        this.inputUtils.ui=this.curUI;
    }
    startLevel() {

        //starting utilities and update function
        this.updateBoardTilesGraphic();
        this.inputUtils.startListening();

        this.board[0][0].findPath(this.enemySpawns[0], this.playerBase, this.board);
        this.timeElapsed=0;
        
       this.update()

    }

}