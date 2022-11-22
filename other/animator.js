class Animator {
    constructor(image, numberOfFrames, interval) {
        this.image = image;
        this.numberOfFrames = numberOfFrames;
        this.curFrame = 0;
        this.interval = interval;
        this.timeElapsed = 0;
    }
    update(timeElapsed) {

        this.timeElapsed += timeElapsed;
        if (this.timeElapsed > this.interval) {
            this.curFrame++;
            if (this.curFrame >= this.numberOfFrames) {
                this.curFrame = 0;
            }
            this.image.startingPointOfImage.x = this.image.width * this.curFrame;
        }
    }
}