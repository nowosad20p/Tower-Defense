class InputUtils {
    constructor(board, ui, canvas) {
        this.board = board;
        this.ui = ui;
        this.canvas = canvas;
    }
    startListening() {
        this.canvas.addEventListener('mousedown', (e) => {
            this.getInput(e)
        })
    }
    getInput(e) {
        let rect = this.canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        if (!this.checkUIInput(x, y)) {
            this.checkBoardInput(x, y);
        }

    }
    checkUIInput() {
        return false;
    }
    checkBoardInput(x, y) {

        let i = Math.floor(x / (this.board.canvas.width / this.board.width));
        let j = Math.floor(y / (this.board.canvas.height / this.board.height));
    
        this.board.activeTile=new Vector2(i,j);
       
    }
}