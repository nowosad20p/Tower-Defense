class EnemySpawn extends Tile {
    constructor(image, waves = [], drawingUtils) {
        //setting up display settings
        super(image);

        //saving needed utils and informations
        this.waves = [
            [],
            []
        ];
        this.drawingUtils = drawingUtils;
    }

    sendWave(waveNumber) {
        //sends all mobs from wave


        this.waves[waveNumber].forEach(element => {
            element.spawn();
        });
        return "eeeee";
    }
    isWalkable(tile) { //returns if entity can walk on this tile

        return (tile instanceof PathTile || tile instanceof EnemySpawn || tile instanceof PlayerBase);
    }
    findPath(startPoint, endPoint, board) {
        //setting arrays
        let result = [];
        let matrix = [];
        //converting board with game objects to 0 and 1's
        for (let i = 0; i < board.length; i++) {
            let piece = [];
            for (let j = 0; j < board[i].length; j++) {
                piece.push((board[i][j] instanceof PathTile || board[i][j] instanceof EnemySpawn || board[i][j] instanceof PlayerBase) ? 1 : 0)

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