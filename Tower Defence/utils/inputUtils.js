class InputUtils {
    constructor(board, ui, canvas) {
        //saving all needed information
        this.board = board;
        this.ui = ui;
        this.canvas = canvas;
    }
    startListening() {
        //setting canvas mouse down event
        this.canvas.addEventListener('mousedown', (e) => {
            this.getInput(e)
        })
    }
    getInput(e) {

        //getting where canvas was clicked
        let rect = this.canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        //checking what was clicked
        if (!this.checkUIInput(x, y)) {
            this.checkBoardInput(x, y);
        }

    }
    checkUIInput(x, y) {

        //calculatin tile size
        let tileWidth = this.canvas.width / this.board.width;
        let tileHeight = this.canvas.height / this.board.height;

        for (let i = 0; i < this.ui.length; i++) {
            //if ui element is container of buttons
            if (this.ui[i] instanceof TowerButtonsContainer) {
                this.ui[i].buttons.forEach(element => {
                    //calculating real position
                    let leftTop = new Vector2(element.position.x * tileWidth - 0.5 * element.size * tileWidth, element.position.y * tileHeight - 0.5 * element.size * tileHeight);
                    let rightBot = new Vector2(element.position.x * tileWidth + 0.5 * element.size * tileWidth, element.position.y * tileHeight + 0.5 * element.size * tileHeight);
                    //checking if clicked
                    if (pointIntersectRectangle(new Vector2(x, y), leftTop, rightBot)) {
                        element.onClick();
                        return true;
                    }
                });
            }
            if (this.ui[i] instanceof Button) {
                   //calculating real position
                let leftTop = new Vector2(this.ui[i].position.x * tileWidth - 0.5 * this.ui[i].size * tileWidth, this.ui[i].position.y * tileHeight - 0.5 * this.ui[i].size * tileHeight);
                let rightBot = new Vector2(this.ui[i].position.x * tileWidth + 0.5 * this.ui[i].size * tileWidth, this.ui[i].position.y * tileHeight + 0.5 * this.ui[i].size * tileHeight);
                    //checking if clicked

                if (pointIntersectRectangle(new Vector2(x, y), leftTop, rightBot)) {

                    this.ui[i].onClick();
                    return true;
                }

            }
        }
        //if nothing was clicked return false
        return false;
    }
    checkBoardInput(x, y) {
        //calculating which tile was clicked
        let i = Math.floor(x / (this.board.canvas.width / this.board.width));
        let j = Math.floor(y / (this.board.canvas.height / this.board.height));
        //setting clicked tile as active
        this.board.activeTile = new Vector2(i, j);
        this.board.updateUI();

    }
}