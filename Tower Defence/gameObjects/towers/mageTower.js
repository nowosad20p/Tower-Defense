class MageTower extends Tower {
    constructor() {
        let image = new Image();
        image.src = "./graphics/mageTower.png"
        super(2, undefined, 0, image, 2, 100);

    }

}