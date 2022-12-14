class EnemySpawn extends Tile {
    constructor(waves = [], drawingUtils, board) {
        //setting up display settings
        super(new BetterImage("enemySpawn", 32, 32, new Vector2(0, 0)));
        this.board = board;
        //saving needed utils and informations
        this.waves = waves;


        this.drawingUtils = drawingUtils;
    }

    sendWave(waveNumber) {
        console.log(this.waves)
        if (waveNumber >= this.waves.length) {
            return [];
        }
        //sends all mobs from wave

        let enemies = [];

        this.waves[waveNumber].groups.forEach(element => {
            let i = 0;
            element.enemies.forEach(enemy => {
                enemies.push(this.spawnEnemy(enemy, element.delay + element.spawnRatio * i))


                i++;
            })
        });

        return enemies

    }
    spawnEnemy(name, delay) {
        switch (name) {
            case "goblin":
                return new Goblin(this.position, this.path, delay);
            case "bat":
                return new Bat(this.position, this.path, delay);
            case "orc":
                return new Orc(this.position, this.path, delay);
            case "villager":
                return new Villager(this.position, this.path, delay);
            case "ghost":
                return new Ghost(this.position, this.path, delay);
            case "fireSpirit":
                return new FireSpirit(this.position, this.path, delay);
            case "amogus":
                return new Amogus(this.position, this.path, delay);
        }
    }
    isWalkable(tile) { //returns if entity can walk on this tile

        return (tile instanceof PathTile || tile instanceof EnemySpawn || tile instanceof PlayerBase);
    }
    findPath(startPoint, endPoint, board) {

        this.position = startPoint;
        //setting arrays
        let result = [];
        let matrix = [];
        //converting board with game objects to 0 and 1's
        for (let i = 0; i < board.length; i++) {
            let piece = [];
            for (let j = 0; j < board[i].length; j++) {
                piece.push((board[i][j] instanceof PathTile || board[i][j] == this || board[i][j] instanceof PlayerBase) ? 1 : 0)

            }
            matrix.push(piece);
        }
        //setting up api
        let easystar = new EasyStar.js();
        easystar.setGrid(matrix);
        easystar.setAcceptableTiles([1]);
        //getting path from api
        easystar.findPath(startPoint.y * 1, startPoint.x * 1, endPoint.y * 1, endPoint.x * 1, function (path) {


            if (path === null) {
                console.log(endPoint)
                console.log("Path was not found.");
            } else {
                path.forEach((element) => {
                    result.push(new Vector2(element.y, element.x))
                })
            }
        });

        easystar.calculate();
        //saving path

        this.path = result;
    }


}