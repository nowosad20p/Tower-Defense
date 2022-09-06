class Entity{
    constructor(image,position=new Vector2(0,0)){
        this.image=image;
        this.position=position;
        this.offset=(Math.random() * (0.75 - 0.25) + 0.25);
    }
    
}