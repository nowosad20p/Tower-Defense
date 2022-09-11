class InputUtils {
    constructor(board, ui, canvas) {
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
    checkUIInput() {
        return false;
    }
    checkBoardInput(x, y) {
        //calculating which tile was clicked
        let i = Math.floor(x / (this.board.canvas.width / this.board.width));
        let j = Math.floor(y / (this.board.canvas.height / this.board.height));
        //setting clicked tile as active
        this.board.activeTile=new Vector2(i,j);
        this.board.updateUI();
       
    }
}