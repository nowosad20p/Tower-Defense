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
    checkUIInput(x,y) {
        console.log(this.ui)
        let tileWidth=this.canvas.width/this.board.width;
        let tileHeight=this.canvas.height/this.board.height;
      
        for(let i=0;i<this.ui.length;i++){
            if(this.ui[i] instanceof TowerButtonsContainer){
                this.ui[i].buttons.forEach(element => {
                    let leftTop=new Vector2(element.position.x*tileWidth-0.5*element.size*tileWidth,element.position.y*tileHeight-0.5*element.size*tileHeight);
                    let rightBot=new Vector2(element.position.x*tileWidth+0.5*element.size*tileWidth,element.position.y*tileHeight+0.5*element.size*tileHeight);
                   
                    if(pointIntersectRectangle(new Vector2(x,y),leftTop,rightBot)){
                        element.onClick();
                        return true;
                    }
                });
            }
        }
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