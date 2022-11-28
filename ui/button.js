class Button {
    constructor(image, height, width, position = new Vector2(0, 0), onclick, unclick = () => { }, onfirstclick = () => { }, size = 0.25,value=null) {
        //saving informations
        this.image = image;
        this.position = position;
        this.height = height;
        this.width = width;

        this.onclick = onclick;
        this.size = size;
        this.confirmed = false;
        this.normalImage = this.image.startingPointOfImage.x;

        this.unclickfunction = unclick;
        this.onfirstclick = onfirstclick;
        this.value=value;
    }
    unclick() {

        this.confirmed = false;
        this.image.startingPointOfImage.x = this.normalImage;
        this.unclickfunction();

    }
    onClick() { //running function provided in constructor
        if (this.confirmed) {
            this.onclick();
            this.unclick();


        } else {
            this.confirmed = true;
            this.onfirstclick();
            this.image.startingPointOfImage.x = 128;

        }
    }
}