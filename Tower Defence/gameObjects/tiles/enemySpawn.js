class EnemySpawn extends Tile {
    constructor(image, waves, drawingUtils) {
        super(image);
        this.tileWidth = 32;
        this.tileHeight = 32;
        this.waves = waves;
        this.drawingUtils = drawingUtils;
    }

    sendWave(waveNumber) {
        this.waves[waveNumber].forEach(element => {
            element.spawn();
        });
    }
    isWalkable(tile) {
        return (tile instanceof PathTile || tile instanceof EnemySpawn || tile instanceof PlayerBase);
    }
    findPath(startPoint, endPoint, board) {
        let result = [];
        let matrix = [];
        for (let i = 0; i < board.length; i++) {
            let piece = [];
            for (let j = 0; j < board[i].length; j++) {
                piece.push((board[i][j] instanceof PathTile || board[i][j] instanceof EnemySpawn || board[i][j] instanceof PlayerBase) ? 1 : 0)

            }
            matrix.push(piece);
        }
        let easystar = new EasyStar.js();


        easystar.setGrid(matrix);
        easystar.setAcceptableTiles([1]);



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

        this.path = result;
    }


}