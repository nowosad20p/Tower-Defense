class TerrainTile extends Tile{
    constructor(image){
        super(image)
        
        this.tileWidth = 32;
        this.tileHeight = 32;
        this.startingPointOfImage = new Vector2(Math.floor(Math.random() * 6)*32 , 0);

    }
}