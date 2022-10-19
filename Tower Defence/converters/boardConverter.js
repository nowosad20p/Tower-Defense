function stringToBoard(string, gameboard) {
    let cur = "";
    let curArray = [];
    let board = [];
    let enemySpawns = [];
    let playerBase;
    let width, height;
    //10w5h1 0 2 0 2 1 2 2 3 0 3 2 4 0 5 0 5 2 6 0 6 1 6 2p1 1 2 3 3 1 4 1 4 2 5 1t0 0 7 2s3 3e
    for (let i = 0; i < string.length; i++) {

        switch (string[i]) {
            case "w": //width

                width = cur;
                cur = "";

                break;
            case "h": //height
                height = cur;
                cur = "";
                for (let i = 0; i < width; i++) {
                    let column = [];
                    for (let j = 0; j < height; j++) {
                        column.push(new TerrainTile());
                    }
                    board.push(column);
                }
                break;
            case "p": //path
                curArray.push(cur);
                cur = "";

                for (let i = 0; i < curArray.length; i += 2) {


                    board[curArray[i]][curArray[i + 1]] = new PathTile();

                }
                //setting correct path graphic
                for (let i = 0; i < board.length; i++) {
                    for (let j = 0; j < board[i].length; j++) {
                        if (board[i][j] instanceof PathTile) {
                            let left = i > 0 ? board[i - 1][j] : undefined;
                            let top = j > 0 ? board[i][j - 1] : undefined;
                            let right = i < width - 1 ? board[i + 1][j] : undefined;
                            let bottom = j < height - 1 ? board[i][j + 1] : undefined;


                            board[i][j].setCorrectTile(left, right, top, bottom)
                        }
                    }
                }

                curArray = [];

                break;
            case "t": //towers
                curArray.push(cur);
                cur = "";

                for (let i = 0; i < curArray.length; i += 2) {

                    board[curArray[i]][curArray[i + 1]] = new TowerSlot(gameboard, new Vector2(curArray[i], curArray[i + 1]));

                }


                curArray = [];
                break;

            case "e": //player base 
                curArray.push(cur);
                cur = "";
                for (let i = 0; i < curArray.length; i += 2) {
                    board[curArray[i]][curArray[i + 1]] = new PlayerBase();
                    playerBase = new Vector2(curArray[i], curArray[i + 1]);
                }
                curArray = [];
                break;

            case "s": //enemy spawns

                curArray.push(cur);
                cur = "";
                console.log(curArray)
                for (let i = 0; i < curArray.length; i += 2) {


                    board[curArray[i]][curArray[i + 1]] = new EnemySpawn([], this.drawingUtils);

                    enemySpawns.push(new Vector2(curArray[i], curArray[i + 1]))

                }

                curArray = [];
                break;
            case " ": //new value

                curArray.push(cur);
                cur = "";
                break;
            default:
                cur += string[i];
                break;
        }


    }
    return [board, playerBase, enemySpawns, new Vector2(width, height)]
}

function boardToString(board) {
    let map = "";
    let towers = [];
    let path = [];

    let camps = [];
    let playerBase;
    //adding vectors with tiles coordinates to correct arrays
    let width = board.length;
    let height = board[0].length;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {

            if (board[i][j] instanceof PathTile) {
                path.push(new Vector2(i, j));
            }
            if (board[i][j] instanceof PlayerBase) {
                playerBase = new Vector2(i, j);

            }
            if (board[i][j] instanceof EnemySpawn) {
                camps.push(new Vector2(i, j));

            }
            if (board[i][j] instanceof TowerSlot) {
                towers.push(new Vector2(i, j));

            }
        }
    }
    //writing array content to string readable by importing function
    map += width + "w" + height + "h";
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