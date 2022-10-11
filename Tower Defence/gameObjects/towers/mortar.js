class Mortar extends Tower {

    constructor(position, board, price) {

        super(1, price, 1, new BetterImage("./graphics/towers/mortar.png", 32, 32, new Vector2(0, 0)), 2, 9, 4, position, board);

    }
    attack() {
        if (this.curTarget != null) {
            console.log(this.board.enemies)
            this.projectiles.push(new CanonBall(Object.create(this.position), this.curTarget, 2, this.stats.damage, "normal",this.board.enemies));
        }
    }

}