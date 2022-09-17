class Button {
    constructor(image, height, width, position = new Vector2(0, 0), onclick, size = 0.25) {
        //saving informations
        this.image = image;
        this.position = position;
        this.height = height;
        this.width = width;

        this.onclick = onclick;
        this.size = size;
    }
    onClick() { //running function provided in constructor
       
        this.onclick();
    }
}