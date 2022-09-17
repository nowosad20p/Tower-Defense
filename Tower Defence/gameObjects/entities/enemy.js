class Enemy extends Entity {
    constructor(image, position = new Vector2(0, 0), path) {
        super(image, position);
        this.path = JSON.parse(JSON.stringify(path));
        this.offset = (Math.random() * (0.55 - 0.45) + 0.45).toFixed(2);
        
        this.wasOffset=false;
       this.prevPosition=new Vector2();
      this.prevPath=[];
     
      
   

    }
    spawn() {
       
       
    }
    update(time){
     
          
           
            if(this.position.x==this.prevPosition.x&&this.position.y==this.prevPosition.y){
                this.prevPath.push(this.path.shift());
            }
            if(this.path.length==0){
                return false;
            }
            this.prevPosition.x=this.position.x;
            this.prevPosition.y=this.position.y;

            this.position.x+=(Math.ceil(this.path[0].x-this.position.x)*time/100*this.movementSpeed)
            this.position.y+=(Math.ceil(this.path[0].y-this.position.y)*time/100*this.movementSpeed)
            
        }

}