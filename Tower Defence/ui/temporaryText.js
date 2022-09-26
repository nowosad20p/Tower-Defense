class TemporaryText {
    constructor(position, text, maxWidth = 100,duration=2) {
        this.position = position;
        this.text = text;
        this.maxWidth = maxWidth;
        this.readyToDelete=false;
        this.duration=duration;
        this.timeOnDisplay=0;
    }
    update(timeElapsed){
        this.timeOnDisplay+=timeElapsed;
        if(this.timeOnDisplay>this.duration){
            this.readyToDelete=true;
        }
    }
}