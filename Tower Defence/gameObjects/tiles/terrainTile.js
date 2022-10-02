class TerrainTile extends Tile {
    constructor() {
        //setting up display settings
        super(new BetterImage("./graphics/terrain.png", 32, 32, new Vector2(0, 0)))


        //setting up random terrain tile
        this.image.startingPointOfImage = new Vector2(Math.floor(Math.random() * 6) * 32, 0);


    }
}