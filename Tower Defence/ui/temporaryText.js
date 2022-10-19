class TemporaryText {
    constructor(position, text, maxWidth = 100, duration = 2) {
        this.position = position;
        this.text = text;
        this.maxWidth = maxWidth;
        this.readyToDelete = false;
        this.duration = duration*1000;
       
    }
    update(timeElapsed) {
        this.duration-=timeElapsed;
        console.log(this.duration)
        if (this.duration <= 0) {
          
            this.readyToDelete = true;
        }
    }
}