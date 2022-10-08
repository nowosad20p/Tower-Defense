class Tower {
    constructor(tier, value, exp, image = undefined, range, damage, attackSpeed, position, board, maxTier = 3, upgradePrice = 150) {

        this.value = value;
        this.tier = tier;
        this.exp = 0;
        this.image = image;
        this.upgradePrice = upgradePrice;
        this.updateImage();

        this.curTarget = null;
        this.position = position;
        //attack settings
        this.range = range;
        this.damage = damage;
        this.projectiles = [];
        this.timeSinceLastAttack = 0;
        this.attackSpeed = attackSpeed * 100;
        this.board = board;
        this.maxTier = maxTier;
        this.towerButtons = new TowerButtonsContainer(0.5,
            [
                new Button(new BetterImage("./graphics/buttons.png", 16, 16, new Vector2(0, 0)), 16, 16, new Vector2(0, 0), () => {
                    this.levelUp();


                }),
                new Button(new BetterImage("./graphics/buttons.png", 16, 16, new Vector2(16, 0)), 16, 16, new Vector2(0, 0), () => {


                    board.board[position.x][position.y] = new TowerSlot(new BetterImage("./graphics/towerSlot.png", 16, 16, new Vector2(0, 0)), this.board, Object.create(this.position))
                    board.coins += 0.8 * this.value;
                })
            ]

        );
    }
    onClick() {

    }
    updateImage() {

        //getting new image part based on tier of tower

        this.image.startingPointOfImage = new Vector2((this.tier - 1) * this.image.width, 0);

    }
    levelUp() {
        if (this.tier < this.maxTier && this.board.coins > this.upgradePrice) {
            this.tier++;
            this.board.coins -= this.upgradePrice;
            this.upgradePrice *= 1.1;
            this.updateImage();
        }
    }
    attack() {
        if(this.curTarget!=null){
        this.projectiles.push(new Projectile(new BetterImage("./graphics/fireball.png",8,8,new Vector2(0,0),0.25),Object.create(this.position),this.curTarget,2,this.damage,"normal"));
        }
    }
    update(enemies, deltaTime) {
        //checking if current target is in range and alive
        if (this.curTarget == null || this.curTarget == undefined || distanceBetweenVectors(this.position, this.curTarget.position) > this.range || this.curTarget.dead || this.curTarget.finished) {
            this.getNewTarget(enemies);
            this.timeSinceLastAttack = 0;

        } else { //attacking
            if (this.timeSinceLastAttack > this.attackSpeed) {
                this.attack();
                this.timeSinceLastAttack = 0;

            } else {
                this.timeSinceLastAttack += deltaTime;

            }

        }
        for(let i=0;i<this.projectiles.length;i++){
            console.log(this.projectiles[i])
            if(this.projectiles[i].finished){
                this.projectiles.splice(i,1);
                i--;
            }else{
                this.projectiles[i].update(deltaTime);
            }
        }
        
    }
    getNewTarget(enemies) { //getting closest enemy in range

        let middleOfTower = new Vector2(this.position.x + 0.5, this.position.y + 0.5);
        if (enemies.length == 0) {
            return false;
        }
        let min = enemies[0];
        for (let i = 1; i < enemies.length; i++) {
            if (enemies[i].spawned) {
                let position1 = distanceBetweenVectors(middleOfTower, min.position);
                let position2 = distanceBetweenVectors(middleOfTower, enemies[i].position);

                if (position2 < position1) {
                    min = enemies[i];
                }
            }
        }
        if (distanceBetweenVectors(middleOfTower, min.position) < this.range) {
            if (min.spawned) {
                this.curTarget = min;
            } else {
                this.curTarget = null;

            }

        } else {
            this.curTarget = null;
        }

    }
}