class Fire extends Effect {
    constructor(damage, duration, tick) {
        super(duration);
        this.timeElapsed = 0;
        this.tick = tick;
        this.damage = damage;
    }
    update(timeElapsed) {
        if (this.timer <= 0) {
            this.finished = true;
        }
        this.timer -= timeElapsed;
        this.timeElapsed += timeElapsed;

    }
}