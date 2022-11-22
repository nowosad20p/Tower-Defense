class FireBall extends Projectile {

    dealDamage() {
        this.target.takeDamage(this.damage, this.damageType, new Fire(2, 5, 0.5));

    }
}