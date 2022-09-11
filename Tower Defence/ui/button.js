class Button{
    constructor(image,height,width,position=new Vector2(0,0),onclick){
        this.image=image;
        this.position=position;
        this.height=height;
        this.width=width;
        this.startingPointOfImage=new Vector2(0,0)
        this.onclick=onclick;
    }
   onClick(){
    this.onclick();
   }
}