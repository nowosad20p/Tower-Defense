class Tower{
    constructor(tier, upgradeChosen, exp,image=undefined,range,damage){
        this.tier=tier;
        this.upgradeChosen=upgradeChosen;
        this.exp=0;
        this.image=image;
        this.tileWidth=32;
        this.tileHeight=32;
        this.updateImage();
        this.range=range;
        this.damage=damage;
    }
    onClick(){
        
    }
    updateImage(){
        this.startingPointOfImage=new Vector2(this.tier*this.tileWidth,0);
    }
}