class Entity{
    constructor(image,position=new Vector2(0,0)){
        this.image=image;
        this.position=position;
        this.alive=false;
    }
    spawn(){
        
        this.alive=true;
    }
    die(){

    }
}