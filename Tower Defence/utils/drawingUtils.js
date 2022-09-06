class DrawingUtils{
    constructor(ctx,width,heigth,tilesInRow,tilesInColumn){
        this.ctx=ctx;
        this.width=width;
        this.heigth=heigth;
        this.tilesInColumn=tilesInColumn;
        this.tilesInRow=tilesInRow;
    }
    drawTile(tile,posX,posY){
      
        
        this.ctx.filter = 'blur(0px)';
        this.ctx.imageSmoothingEnabled=false;
        this.ctx['oImageSmoothingEnabled']
        
        this.ctx.drawImage(tile.image,tile.startingPointOfImage.x,tile.startingPointOfImage.y,tile.tileWidth,tile.tileHeight,this.width/this.tilesInRow*posX,this.heigth/this.tilesInColumn*posY,this.width/this.tilesInRow,this.heigth/this.tilesInColumn);
        
    }
    drawTurretRange(x,y,board){
        this.ctx.beginPath();
        this.ctx.arc((this.width/this.tilesInRow)*x+0.5*(this.width/this.tilesInRow), (this.heigth/this.tilesInColumn)*y+0.5*(this.heigth/this.tilesInColumn), board[x][y].range*(this.width/this.tilesInRow), 0, 2 * Math.PI, false);
        this.ctx.strokeStyle = '#FF0000';
        this.ctx.stroke();
      
    }
    drawPath(spawn,offset=0.5){
        this.ctx.beginPath();
        console.log(offset)
        let array = JSON.parse(JSON.stringify(spawn.path));
        let a=array.shift();
        let rowTileSize=this.width/this.tilesInRow;
        let colTileSize=this.heigth/this.tilesInColumn;
        this.ctx.moveTo(a.x+0.5*rowTileSize,a.y+0.5*colTileSize);
        
        array.forEach(element => {
       
            this.ctx.lineTo(element.x*rowTileSize+offset*rowTileSize,element.y*colTileSize+(1-offset)*colTileSize);
        });
        this.ctx.stroke();
    }
    drawGrid(){
        let rowTileSize=this.width/this.tilesInRow;
        let colTileSize=this.heigth/this.tilesInColumn;
     
        
        for(let i=0;i<this.tilesInRow;i++){
            for(let j=0;j<this.tilesInColumn;j++){
                this.ctx.moveTo(rowTileSize*i,colTileSize*j);
                this.ctx.lineTo(rowTileSize*(i+1),colTileSize*j);
                this.ctx.lineTo(rowTileSize*(i+1),colTileSize*(j+1));
                this.ctx.lineTo(rowTileSize*i,colTileSize*(j+1));
                this.ctx.lineTo(rowTileSize*(i),colTileSize*(j));
                this.ctx.strokeStyle="black";
              

                this.ctx.stroke();
            }
        }
       
               
    }
}