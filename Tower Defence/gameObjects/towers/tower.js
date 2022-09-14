class Tower {
    constructor(tier, upgradeChosen, exp, image = undefined, range, damage) {
        this.tier = tier;
        this.upgradeChosen = upgradeChosen;
        this.exp = 0;
        this.image = image;
        this.tileWidth = 32;
        this.tileHeight = 32;
        this.updateImage();
        this.range = range;
        this.damage = damage;
        //this.towerButtons = new TowerButtonsContainer(2, this)
    }
    onClick() {

    }
    updateImage() {
        //getting new image part based on tier of tower
        this.startingPointOfImage = new Vector2(this.tier * this.tileWidth, 0);
    }
    levelUp(){
        if(tier<3){
            tier++;
        }
    }
}