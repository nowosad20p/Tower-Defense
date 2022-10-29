class PreloadedImages {
    constructor() {
        if (PreloadedImages.exists) { //if instance of this object exist return this instance
            return PreloadedImages.instance;
        }
        //creating instance
        this.loaded = false;
        this.toLoad = 0;

        //list of images and their names
        this.images = {
            //projectiles
            "canonBall": this.loadImage("./graphics/projectiles/cannonBall.png"),
            "arrow": this.loadImage("./graphics/projectiles/arrow.png"),
            "iceCrystal": this.loadImage("./graphics/projectiles/iceCrystal.png"),
            "fireball": this.loadImage("./graphics/projectiles/fireball.png"),
            //towers
            "towerSlot": this.loadImage("./graphics/towers/towerSlot.png"),
            "archerTower": this.loadImage("./graphics/towers/archerTower.png"),
            "mortar": this.loadImage("./graphics/towers/mortar.png"),
            "mageTower": this.loadImage("./graphics/towers/mageTower.png"),
            "iceTower": this.loadImage("./graphics/towers/iceTower.png"),
            "trooperTower": this.loadImage("./graphics/towers/trooperTower.png"),
            //enemies
            "goblin": this.loadImage("./graphics/enemies/goblin.png"),
            "bat": this.loadImage("./graphics/enemies/bat.png"),
            "orc":this.loadImage("./graphics/enemies/orc.png"),
            "ghost":this.loadImage("./graphics/enemies/ghost.png"),
            "villager":this.loadImage("./graphics/enemies/villager.png"),
            "fireSpirit":this.loadImage("./graphics/enemies/fireSpirit.png"),

            //tiles
            "terrain": this.loadImage("./graphics/tiles/terrain.png"),
            "enemySpawn": this.loadImage("./graphics/tiles/enemySpawn.png"),
            "playerBase": this.loadImage("./graphics/tiles/playerBase.png"),
            "roads": this.loadImage("./graphics/tiles/roads.png"),
            //ui
            "buttons": this.loadImage("./graphics/ui/buttons.png"),
            "coin": this.loadImage("./graphics/ui/coin.png"),
            "hp": this.loadImage("./graphics/ui/hp.png"),
            "towerButtons": this.loadImage("./graphics/ui/towerButtons.png")
        }





        PreloadedImages.exists = true;
        PreloadedImages.instance = this;
        return this;
    }
    loadImage(path) { //loading image
        this.toLoad++;
        let newImage = new Image();
        newImage.src = path;
        newImage.onload = () => {
            this.toLoad--;

            if (this.toLoad <= 0) {

                this.loaded = true;

            }
        }
        return newImage;
    }
}