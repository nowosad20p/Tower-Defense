class BetterImage {
    constructor(name, width, height, startingPointOfImage = new Vector2(0, 0), size = 1) {
        
        let preloaded=new PreloadedImages();
        this.img = preloaded.images[name];
        this.width = width;
        this.height = height;
        this.startingPointOfImage = startingPointOfImage;
        this.size = size;

    }
}