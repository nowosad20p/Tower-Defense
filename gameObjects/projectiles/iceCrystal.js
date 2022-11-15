class IceCrystal extends Projectile {

    dealDamage() {
        this.target.takeDamage(this.damage, this.damageType, new Slow(5, 0.6));

    }
}