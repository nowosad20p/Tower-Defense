class Button {
    constructor(image, height, width, position = new Vector2(0, 0), onclick, size = 0.25) {
        //saving informations
        this.image = image;
        this.position = position;
        this.height = height;
        this.width = width;

        this.onclick = onclick;
        this.size = size;
        this.confirmed = false;
        this.normalImage = this.image.startingPointOfImage.x;
    }
    unclick() {
        this.confirmed = false;
        this.image.startingPointOfImage.x = this.normalImage;

    }
    onClick() { //running function provided in constructor
        if (this.confirmed) {
            this.onclick();
        } else {
            this.confirmed = true;

            this.image.startingPointOfImage.x = 112;

        }
    }
}