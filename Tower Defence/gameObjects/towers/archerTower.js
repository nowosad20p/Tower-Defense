class ArcherTower extends Tower {
    constructor(position, board, price) {

        super(1, price, 1, new BetterImage("./graphics/archerTower.png", 32, 32, new Vector2(0, 0)), 4, 7, 6, position, board);

    }
    attack() {
        if (this.curTarget != null) {
            this.projectiles.push(new Projectile(new BetterImage("./graphics/projectiles/arrow.png", 8, 8, new Vector2(0, 0), 0.15), Object.create(this.position), this.curTarget, 5, this.stats.damage, "normal"));
        }
    }
}