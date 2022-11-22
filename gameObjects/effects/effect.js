class Effect {
    constructor(timer) {
        this.timer = timer;
        this.finished = false;
    }
    update(timeElapsed) {
        if (this.timer <= 0) {
            this.finished = true;
        }
        this.timer -= timeElapsed;
    }
}
