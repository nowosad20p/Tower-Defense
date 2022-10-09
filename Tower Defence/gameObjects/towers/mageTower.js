class MageTower extends Tower {
    constructor(position, board, price) {


        super(1, price, 1, new BetterImage("./graphics/mageTower.png", 32, 32, new Vector2(0, 0)), 1.5, 5, 2, position, board);

    }
    attack() {
        if(this.curTarget!=null){
        this.projectiles.push(new Projectile(new BetterImage("./graphics/fireball.png",8,8,new Vector2(0,0),0.25),Object.create(this.position),this.curTarget,2,this.stats.damage,"normal"));
        }
    }
}