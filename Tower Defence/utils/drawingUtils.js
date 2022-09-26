class DrawingUtils {
    constructor(ctx, width, heigth, tilesInRow, tilesInColumn) {
        //saving needed information
        this.ctx = ctx;
        this.width = width;
        this.heigth = heigth;
        this.tilesInColumn = tilesInColumn;
        this.tilesInRow = tilesInRow;
        this.rowTileSize = this.width / this.tilesInRow;
        this.colTileSize = this.heigth / this.tilesInColumn;
    }
    drawTile(tile, posX, posY) {

        tile = tile.image;


        //setting up context properties
        this.ctx.filter = 'blur(0px)';
        this.ctx.imageSmoothingEnabled = false;
        this.ctx['oImageSmoothingEnabled']
        //drawing tile
        this.ctx.drawImage(tile.img, tile.startingPointOfImage.x, tile.startingPointOfImage.y, tile.width, tile.height, this.width / this.tilesInRow * posX, this.heigth / this.tilesInColumn * posY, this.width / this.tilesInRow, this.heigth / this.tilesInColumn);
    }
    drawText(text) {
        this.ctx.fillText(text, this.width / 2, this.heigth / 2)
    }
    drawEntity(entity) {
        this.ctx.drawImage(entity.image.img, entity.image.startingPointOfImage.x, entity.image.startingPointOfImage.y, entity.image.width, entity.image.height, this.width / this.tilesInRow * entity.position.x, this.heigth / this.tilesInColumn * entity.position.y, this.width / this.tilesInRow * entity.image.size, this.heigth / this.tilesInColumn * entity.image.size);

    }
    drawTurretRange(x, y, board) {
        //drawing circle expressing turret range on x,y 
        this.ctx.beginPath();
        this.ctx.arc((this.width / this.tilesInRow) * x + 0.5 * (this.width / this.tilesInRow), (this.heigth / this.tilesInColumn) * y + 0.5 * (this.heigth / this.tilesInColumn), board[x][y].range * (this.width / this.tilesInRow), 0, 2 * Math.PI, false);
        this.ctx.strokeStyle = '#FF0000';
        this.ctx.stroke();

    }
    drawPath(spawn, offset = 0.5) {
    
        //drawing lines to vectors saved in path in spawn object
        this.ctx.beginPath();
        let array = JSON.parse(JSON.stringify(spawn.path));
        let a = array.shift();
       
        let rowTileSize = this.width / this.tilesInRow;
        let colTileSize = this.heigth / this.tilesInColumn;
        this.ctx.moveTo(a.x *rowTileSize+ 0.5 * rowTileSize, a.y *colTileSize+ + 0.5 * colTileSize);
     
        array.forEach(element => {

            this.ctx.lineTo(element.x * rowTileSize + offset * rowTileSize, element.y * colTileSize + (1 - offset) * colTileSize);
        });
        this.ctx.stroke();
    }
    drawGrid() {
        //calculating tile sizes
        let rowTileSize = this.width / this.tilesInRow;
        let colTileSize = this.heigth / this.tilesInColumn;

        //drawing grid
        for (let i = 0; i < this.tilesInRow; i++) {
            for (let j = 0; j < this.tilesInColumn; j++) {
                this.ctx.moveTo(rowTileSize * i, colTileSize * j);
                this.ctx.lineTo(rowTileSize * (i + 1), colTileSize * j);
                this.ctx.lineTo(rowTileSize * (i + 1), colTileSize * (j + 1));
                this.ctx.lineTo(rowTileSize * i, colTileSize * (j + 1));
                this.ctx.lineTo(rowTileSize * (i), colTileSize * (j));
                this.ctx.strokeStyle = "black";


                this.ctx.stroke();
            }
        }


    }
    drawTowerButtons(container, position) {
        this.ctx.beginPath();
        //changing position to center of a tile
        position.x += 0.5;
        position.y += 0.5;
        //drawing circle
        this.ctx.arc((this.width / this.tilesInRow) * position.x, (this.heigth / this.tilesInColumn) * position.y, container.radius * this.width / this.tilesInRow, 0, 2 * Math.PI, false);
        this.ctx.strokeStyle = '#000';
        this.ctx.stroke();
        //drawing buttons
        let i = 0;
        container.buttons.forEach(element => {
            //calculating angle, and based on angle position on circle
            let angle = 360 / container.buttons.length * i;
            angle *= Math.PI / 180

            element.position = new Vector2(container.radius * Math.sin(angle) + position.x, container.radius * Math.cos(angle) + position.y);

            this.drawButton(element)
            i++;
        });



    }
    drawButton(button) {

        //drawing button image

        this.ctx.drawImage(button.image.img, button.image.startingPointOfImage.x, button.image.startingPointOfImage.y, button.image.width, button.image.height, this.width / this.tilesInRow * button.position.x - 0.5 * button.size * this.width / this.tilesInRow, this.heigth / this.tilesInColumn * button.position.y - 0.5 * button.size * this.heigth / this.tilesInColumn, this.width / this.tilesInRow * button.size, this.heigth / this.tilesInColumn * button.size);

    }
    drawLine(start,end){
        this.ctx.beginPath();
        this.ctx.moveTo(start.x*this.rowTileSize,start.y*this.colTileSize);
        this.ctx.lineTo(end.x*this.rowTileSize,end.y*this.colTileSize);
        this.ctx.stroke();
    }

}