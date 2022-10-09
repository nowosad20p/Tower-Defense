class BetterImage {
    constructor(path, width, height, startingPointOfImage = new Vector2(0, 0), size = 1) {
        let img = new Image();
        img.src = path;
        this.img = img;
        this.width = width;
        this.height = height;
        this.startingPointOfImage = startingPointOfImage;
        this.size = size;

    }
}