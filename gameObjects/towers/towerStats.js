class TowerStats {
    constructor(range, damage, attackSpeed, exp, value) {
        this.range = range;
        this.damage = damage;
        this.attackSpeed = attackSpeed;
        this.exp = exp;
        this.value = value;
    }
    addStats(stats) {
        this.range += stats.range;
        this.damage += stats.damage;
        this.attackSpeed += stats.attackSpeed;
        console.log(this.range)
    }
}