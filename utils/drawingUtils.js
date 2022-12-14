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
    resize(width, height) {
        this.width = width;
        this.heigth = height;
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
    drawText(text, color = "black", position = new Vector2(this.tilesInRow / 2, this.tilesInColumn / 2)) {

        this.ctx.fillStyle = color;
        this.ctx.font = this.rowTileSize/7+"px Arial";
        this.ctx.fillText(text, position.x * this.rowTileSize, position.y * this.colTileSize);
    }
    drawEntity(entity) {
      
        this.ctx.drawImage(entity.image.img, entity.image.startingPointOfImage.x, entity.image.startingPointOfImage.y, entity.image.width, entity.image.height, this.width / this.tilesInRow * entity.position.x, this.heigth / this.tilesInColumn * entity.position.y, this.width / this.tilesInRow * entity.image.size, this.heigth / this.tilesInColumn * entity.image.size);
        if (entity.hp < entity.maxHp) { //drawing hp bar 
            let leftTop = new Vector2(entity.position.x, entity.position.y - (entity.image.size * 0.1));
            let rightBot = new Vector2(entity.position.x + entity.image.size, entity.position.y);

            this.drawRectangle(leftTop, rightBot, "#2ca849");

            rightBot.x -= entity.image.size * entity.hp / entity.maxHp;
            this.drawRectangle(leftTop, rightBot, "#a63c24");

        }
   



    }
    drawTurretStats(turret) {
        this.drawRectangle(new Vector2(turret.position.x + 0.2, turret.position.y + 0.2), new Vector2(turret.position.x + 0.8, turret.position.y + 0.9), "rgba(0,0,0,0.5)");
        this.drawText("Stats:", "white", new Vector2(turret.position.x + 0.4, turret.position.y + 0.3));
        this.drawText("Range:" + turret.statsToDisplay.range, "white", new Vector2(turret.position.x + 0.4, turret.position.y + 0.4));
        this.drawText("Damage:" + turret.statsToDisplay.damage, "white", new Vector2(turret.position.x + 0.4, turret.position.y + 0.5));
        this.drawText("AS:" + turret.statsToDisplay.attackSpeed / 100, "white", new Vector2(turret.position.x + 0.4, turret.position.y + 0.6));
        if(turret.description!=undefined){
        this.drawText(turret.description, "white", new Vector2(turret.position.x + 0.4, turret.position.y + 0.8));
        }


    }
    drawProjectile(projectile) { //drawing image based on projectile object
        this.ctx.save();
        let imageX = projectile.image.startingPointOfImage.x;
        let imageY = projectile.image.startingPointOfImage.y;
        let imageWidth = projectile.image.width;
        let imageHeight = projectile.image.height
        let displayX = this.width / this.tilesInRow * (projectile.position.x - (projectile.image.size * 0.5));
        let displayY = this.heigth / this.tilesInColumn * (projectile.position.y - (projectile.image.size * 0.5));
        let displayWidth = this.width / this.tilesInRow * 1.5 * projectile.image.size;
        let displayHeight = this.heigth / this.tilesInColumn * 1.5 * projectile.image.size;
        //rotating image
        this.ctx.translate(displayX + displayWidth / 2, displayY + displayHeight / 2);
     
        this.ctx.rotate(Math.atan2(projectile.target.position.y - projectile.position.y, projectile.target.position.x - projectile.position.x));


        this.ctx.translate(-displayX - displayWidth / 2, -displayY - displayHeight / 2);
        this.ctx.drawImage(projectile.image.img, imageX, imageY, imageWidth, imageHeight, displayX, displayY, displayWidth, displayHeight);

        this.ctx.restore();

    }
    drawTurretRange(x, y, board) {
        //drawing circle expressing turret range on x,y 
        this.ctx.beginPath();
        this.ctx.arc((this.width / this.tilesInRow) * x + 0.5 * (this.width / this.tilesInRow), (this.heigth / this.tilesInColumn) * y + 0.5 * (this.heigth / this.tilesInColumn), board[x][y].stats.range * (this.width / this.tilesInRow), 0, 2 * Math.PI, false);
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
        this.ctx.moveTo(a.x * rowTileSize + 0.5 * rowTileSize, a.y * colTileSize + +0.5 * colTileSize);

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
        if(button.value!=null){
            this.drawText(button.value,"black",new Vector2(button.position.x-(button.size/3),button.position.y+button.size))
        }
    }
    drawLine(start, end) { //drawing line between two points

        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.moveTo(start.x * this.rowTileSize, start.y * this.colTileSize);
        this.ctx.lineTo(end.x * this.rowTileSize, end.y * this.colTileSize);
        this.ctx.stroke();
    }
    drawRectangle(leftTop, rightBot, color) { //drawing rectangle

        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.moveTo(leftTop.x * this.rowTileSize, leftTop.y * this.colTileSize);
        this.ctx.lineTo(rightBot.x * this.rowTileSize, leftTop.y * this.colTileSize);
        this.ctx.lineTo(rightBot.x * this.rowTileSize, rightBot.y * this.colTileSize);
        this.ctx.lineTo(leftTop.x * this.rowTileSize, rightBot.y * this.colTileSize);
        this.ctx.lineTo(leftTop.x * this.rowTileSize, leftTop.y * this.colTileSize);
        this.ctx.fill();
    }


}