class BoardCreator {
    constructor(canvas,width,height){
      
        this.canvas=canvas;
        this.inputUtils = new InputUtils(this,[],canvas);
        this.inputUtils.startListening();
        this.drawingUtils = new DrawingUtils(canvas.getContext("2d"), canvas.width, canvas.height, width, height);
        this.board=[];
        this.width=width;
        this.height=height;
        this.activeTile=null;
        let img = new Image();
        img.src = "./graphics/roads.png";

       
   
        this.tileToSet=new PathTile(img);
        for(let i=0;i<width;i++){
            let piece = [];
            for(let j=0;j<height;j++){
                let image = new Image();
            
                image.src = "./graphics/terrain.png";
                
                piece.push(new TerrainTile(image));
            }
            this.board.push(piece)
        }
        this.interval = window.setInterval(() => {
            this.update()
            
        }, 1000);
    }
    update(){
       if(this.activeTile!=null){
        let img = new Image();
        switch(this.tileToSet){
            case "terrain":
                 
                img.src = "./graphics/grass.png";
                this.board[this.activeTile.x][this.activeTile.y]=new TerrainTile(img);
                break;
            case "path":
            
                img.src = "./graphics/roads.png";
                this.board[this.activeTile.x][this.activeTile.y]=new PathTile(img);
                break;
            case "camp":
               
                img.src = "./graphics/enemySpawn.png";
                this.board[this.activeTile.x][this.activeTile.y]=new EnemySpawn(img);
                break;
            case "base":
               
                img.src = "./graphics/playerBase.png";
                this.board[this.activeTile.x][this.activeTile.y]=new PlayerBase(img);
                break;
            case "tower":
              
                img.src = "./graphics/towerSlot.png";
                this.board[this.activeTile.x][this.activeTile.y]=new TowerSlot(img);
                break;
            default:
                console.log("pozdro poćwicz")
        }
        this.activeTile=null;
        this.updateBoardTilesGraphic();
       }
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
            
                this.drawingUtils.drawTile(this.board[i][j], i, j);
                //this.drawingUtils.drawGrid();
            }
        }
    }
    updateBoardTilesGraphic() {
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
}