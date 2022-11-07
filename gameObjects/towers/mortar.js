class Mortar extends Tower {

    constructor(position, board, price) {

        super(1, price, 1, new BetterImage("mortar", 32, 32, new Vector2(0, 0)), 2, 9, 4, position, board);

    }
    attack() {
        if (this.curTarget != null) { //sending canonball last to enemy position


            this.projectiles.push(new CanonBall(Object.create(this.position), new Vector2(this.curTarget.position.x, this.curTarget.position.y), 2, this.stats.damage, "normal", this.board.enemies));

        }
    }

}