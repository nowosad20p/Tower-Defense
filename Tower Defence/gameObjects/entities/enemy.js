class Enemy extends Entity {
    constructor(image, position = new Vector2(0, 0), path) {
        super(image, position);
        this.path = path;
        this.offset = (Math.random() * (0.75 - 0.25) + 0.25);
        this.path.forEach(element => {
            element.offset(this.offset)
        });

    }
    spawn() {
        this.alive = true;
        this.currentDir = this.path.shift();
    }


}