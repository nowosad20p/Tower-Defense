class DrawingUtils{
    constructor(ctx,width,heigth,tilesInRow,tilesInColumn){
        this.ctx=ctx;
        this.width=width;
        this.heigth=heigth;
        this.tilesInColumn=tilesInColumn;
        this.tilesInRow=tilesInRow;
    }
    drawTile(tile,posX,posY){
      
        //setting up context properties
        this.ctx.filter = 'blur(0px)';
        this.ctx.imageSmoothingEnabled=false;
        this.ctx['oImageSmoothingEnabled']
        //drawing tile
        this.ctx.drawImage(tile.image,tile.startingPointOfImage.x,tile.startingPointOfImage.y,tile.tileWidth,tile.tileHeight,this.width/this.tilesInRow*posX,this.heigth/this.tilesInColumn*posY,this.width/this.tilesInRow,this.heigth/this.tilesInColumn);
        
    }
    drawTurretRange(x,y,board){
        //drawing circle expressing turret range on x,y 
        this.ctx.beginPath();
        this.ctx.arc((this.width/this.tilesInRow)*x+0.5*(this.width/this.tilesInRow), (this.heigth/this.tilesInColumn)*y+0.5*(this.heigth/this.tilesInColumn), board[x][y].range*(this.width/this.tilesInRow), 0, 2 * Math.PI, false);
        this.ctx.strokeStyle = '#FF0000';
        this.ctx.stroke();
      
    }
    drawPath(spawn,offset=0.5){
        //drawing lines to vectors saved in path in spawn object
        this.ctx.beginPath();
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
        //calculating tile sizes
        let rowTileSize=this.width/this.tilesInRow;
        let colTileSize=this.heigth/this.tilesInColumn;
     
        //drawing grid
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
    drawTowerButtons(container,position){
        this.ctx.beginPath();
  
        
        this.ctx.arc((this.width/this.tilesInRow)*position.x+0.5*(this.width/this.tilesInRow), (this.heigth/this.tilesInColumn)*position.y+0.5*(this.heigth/this.tilesInColumn), container.radius*this.width/this.tilesInRow, 0, 2 * Math.PI, false);
        this.ctx.strokeStyle = '#000';
        this.ctx.stroke();
        let i=0;
        container.buttons.forEach(element => {
            let angle = 360/container.buttons.length*i;
            angle*=Math.PI/180

            element.position=new Vector2(container.radius*Math.sin(angle)+position.x,container.radius*Math.cos(angle)+position.y);
           
            this.drawButton(element)
            i++;
        });

        
     
    }
    drawButton(button){
       
        this.ctx.drawImage(button.image,button.startingPointOfImage.x,button.startingPointOfImage.y,button.width,button.height,this.width/this.tilesInRow*button.position.x+this.width/this.tilesInRow*0.25,this.heigth/this.tilesInColumn*button.position.y+this.heigth/this.tilesInColumn*0.25,this.width/this.tilesInRow*0.5,this.heigth/this.tilesInColumn*0.5);

    }
}