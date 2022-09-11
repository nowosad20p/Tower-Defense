class PathTile extends Tile {
    constructor(image) {
        //setting up display properties
        super(image);
    

       

    }
    setCorrectTile(leftTile, rightTile, upTile, bottomTile) {
        //setting correct tile graphic
      
        // 0 0 dół prawo
        // 0 1 lewo dół prawo 
        // 0 2 lewo prawo 
        // 0 3 lewo dół
        // 1 0 góra prawo dół 
        //1 1 lewo góra dół prawo 
        // 1 2 lewo góra dół
        // 1 3 góra dół
        // 2 0 góra prawo
        //2 1 lewo góra prawo 
        // 2 2 lewo góra
        // 2 3 środek 
        if (leftTile instanceof PathTile && rightTile instanceof PathTile && upTile instanceof PathTile && bottomTile instanceof PathTile) {
            //1 1 lewo góra dół prawo 
            this.image.startingPointOfImage.x=this.tileWidth*1;
            this.image.startingPointOfImage.y=this.tileWidth*1;


        } else if (leftTile instanceof PathTile && rightTile instanceof PathTile && upTile instanceof PathTile) {
            //2 1 lewo góra prawo 
            this.image.startingPointOfImage.x=this.tileWidth*1;
            this.image.startingPointOfImage.y=this.tileWidth*2;
        } else if (leftTile instanceof PathTile && rightTile instanceof PathTile && bottomTile instanceof PathTile) {
            // 0 1 lewo dół prawo 
            this.image.startingPointOfImage.x=this.tileWidth*1;
            this.image.startingPointOfImage.y=this.tileWidth*0;
        } else if (leftTile instanceof PathTile && bottomTile instanceof PathTile && upTile instanceof PathTile) {
            // 1 2 lewo góra dół
            this.image.startingPointOfImage.x=this.tileWidth*2;
            this.image.startingPointOfImage.y=this.tileWidth*1;
        } else if (bottomTile instanceof PathTile && rightTile instanceof PathTile && upTile instanceof PathTile) {
            // 1 0 góra prawo dół 
            this.image.startingPointOfImage.x=this.tileWidth*0;
            this.image.startingPointOfImage.y=this.tileWidth*1;
        } else if (leftTile instanceof PathTile && rightTile instanceof PathTile) {
            // 0 2 lewo prawo 
            this.image.startingPointOfImage.x=this.tileWidth*2;
            this.image.startingPointOfImage.y=this.tileWidth*0;
        } else if (leftTile instanceof PathTile && upTile instanceof PathTile) {
            // 2 2 lewo góra
            this.image.startingPointOfImage.x=this.tileWidth*2;
            this.image.startingPointOfImage.y=this.tileWidth*2;
        } else if (bottomTile instanceof PathTile && upTile instanceof PathTile) {
        // 1 3 góra dół
        this.image.startingPointOfImage.x=this.tileWidth*3;
        this.image.startingPointOfImage.y=this.tileWidth*1;
        } else if (upTile instanceof PathTile && rightTile instanceof PathTile) {
        // 2 0 góra prawo
        this.image.startingPointOfImage.x=this.tileWidth*0;
        this.image.startingPointOfImage.y=this.tileWidth*2;
        } else if (leftTile instanceof PathTile && bottomTile instanceof PathTile) {
        // 0 3 lewo dół
        this.image.startingPointOfImage.x=this.tileWidth*3;
        this.image.startingPointOfImage.y=this.tileWidth*0;
        } else if (bottomTile instanceof PathTile && rightTile instanceof PathTile) {
        // 0 0 dół prawo
        this.image.startingPointOfImage.x=this.tileWidth*0;
        this.image.startingPointOfImage.y=this.tileWidth*0;
        } else if(upTile instanceof PathTile){
            this.image.startingPointOfImage.x=this.tileWidth*0;
            this.image.startingPointOfImage.y=this.tileWidth*3;
        }else if(leftTile instanceof PathTile){
            this.image.startingPointOfImage.x=this.tileWidth*1;
            this.image.startingPointOfImage.y=this.tileWidth*3;
        }else if(rightTile instanceof PathTile){
            this.image.startingPointOfImage.x=this.tileWidth*2;
            this.image.startingPointOfImage.y=this.tileWidth*3;
        }else if(bottomTile){
            this.image.startingPointOfImage.x=this.tileWidth*3;
            this.image.startingPointOfImage.y=this.tileWidth*3;
        }
        else {
            //2 3 środek 
            this.startingPointOfImage.x=this.tileWidth*3;
            this.startingPointOfImage.y=this.tileWidth*2;
        }






    }
}