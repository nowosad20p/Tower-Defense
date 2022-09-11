class TowerSlot extends Tile {
    constructor(image) {
        super(image);
        this.startingPointOfImage = new Vector2(0, 0);

        this.tileWidth = 16;
        this.tileHeight = 16;
        this.towerButtons = new TowerButtonsContainer(0.5, this)
    }
}