class Mortar extends Tower{
    
        constructor(position, board, price) {

            super(1, price, 1, new BetterImage("./graphics/towers/mortar.png", 32, 32, new Vector2(0, 0)), 2, 9, 4, position, board);
    
        }
        attack() {
            if(this.curTarget!=null){
            this.projectiles.push(new Projectile(new BetterImage("./graphics/projectiles/cannonBall.png",8,8,new Vector2(0,0),0.25),Object.create(this.position),this.curTarget,2,this.stats.damage,"normal"));
            }
        }
        
}