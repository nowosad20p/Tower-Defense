class IceTower extends Tower {
    constructor(position, board, price) {

        super(1, price, 1, new BetterImage("iceTower", 32, 32, new Vector2(0, 0)), 2, 9, 4, position, board);

    }
    attack() {
        if (this.curTarget != null) {
            this.projectiles.push(new IceCrystal(new BetterImage("iceCrystal", 8, 8, new Vector2(0, 0), 0.25), Object.create(this.position), this.curTarget, 3, this.stats.damage, "normal"));
        }
    }
}