class DrawingUtils{
    constructor(ctx,width,heigth,tilesInRow,tilesInColumn){
        this.ctx=ctx;
        this.width=width;
        this.heigth=heigth;
        this.tilesInColumn=tilesInColumn;
        this.tilesInRow=tilesInRow;
    }
    drawTile(tile,posX,posY){
      
        // this.ctx.beginPath();
        // this.ctx.fillColor="red";
        // this.ctx.strokeColor="black";
        // this.ctx.moveTo(this.width/this.tilesInRow*posX,this.width/this.tilesInColumn*posY);
        // this.ctx.lineTo(this.width/this.tilesInRow*(posX+1),this.width/this.tilesInColumn*posY);
        // this.ctx.lineTo(this.width/this.tilesInRow*(posX+1),this.width/this.tilesInColumn*(posY+1));
        // this.ctx.lineTo(this.width/this.tilesInRow*posX,this.width/this.tilesInColumn*(posY+1));
        // this.ctx.lineTo(this.width/this.tilesInRow*posX,this.width/this.tilesInColumn*posY);
      
        // this.ctx.stroke();
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
}