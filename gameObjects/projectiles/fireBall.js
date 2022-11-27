class FireBall extends Projectile {
    constructor(position, target, speed, damage){
        super(new BetterImage("fireball", 8, 8, new Vector2(0, 0), 0.1), position, target, speed, damage, "fire");

    }
    dealDamage() {
        this.target.takeDamage(this.damage, this.damageType, new Fire(2, 5, 0.5));

    }
}