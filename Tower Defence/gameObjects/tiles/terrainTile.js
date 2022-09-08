class TerrainTile extends Tile{
    constructor(image){
        //setting up display settings
        super(image)
        
        
        //setting up random terrain tile
        this.startingPointOfImage = new Vector2(Math.floor(Math.random() * 6)*32 , 0);

    }
}