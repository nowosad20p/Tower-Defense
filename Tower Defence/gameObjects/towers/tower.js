class Tower {
    constructor(tier, upgradeChosen, exp, image = undefined, range, damage, position) {
        this.tier = tier;
        this.upgradeChosen = upgradeChosen;
        this.exp = 0;
        this.image = image;
        this.tileWidth = 32;
        this.tileHeight = 32;
        this.updateImage();
        this.range = range;
        this.damage = damage;
        this.curTarget = null;
        this.position = position;
        //attack settings
        this.projectiles = [];
        this.timeSinceLastAttack = 0;
        this.attackSpeed = 500;
        //this.towerButtons = new TowerButtonsContainer(2, this)
    }
    onClick() {

    }
    updateImage() {
        //getting new image part based on tier of tower
        this.startingPointOfImage = new Vector2(this.tier * this.tileWidth, 0);
    }
    levelUp() {
        if (tier < 3) {
            tier++;
        }
    }
    attack() {
        this.curTarget.takeDamage(this.damage)
    }
    update(enemies, deltaTime) {

        if (this.curTarget == null || this.curTarget == undefined || distanceBetweenVectors(this.position, this.curTarget.position) > this.range || this.curTarget.dead || this.curTarget.finished) {
            this.getNewTarget(enemies);
            this.timeSinceLastAttack = 0;

        } else {
            if (this.timeSinceLastAttack > this.attackSpeed) {
                this.attack();
                this.timeSinceLastAttack = 0;

            } else {
                this.timeSinceLastAttack += deltaTime;

            }

        }
    }
    getNewTarget(enemies) {

        let middleOfTower = new Vector2(this.position.x + 0.5, this.position.y + 0.5);
        if (enemies.length == 0) {
            return false;
        }
        let min = enemies[0];
        for (let i = 1; i < enemies.length; i++) {

            let position1 = distanceBetweenVectors(middleOfTower, min.position);
            let position2 = distanceBetweenVectors(middleOfTower, enemies[i].position);

            if (position2 < position1) {
                min = enemies[i];
            }
        }
        if (distanceBetweenVectors(middleOfTower, min.position) < this.range) {
            this.curTarget = min;

        } else {
            this.curTarget = null;
        }

    }
}