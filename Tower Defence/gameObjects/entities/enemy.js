class Enemy extends Entity {
    constructor(image, position = new Vector2(0, 0), path) {
        super(image, Object.create(position));
        this.path = [];
        path.forEach(element => {
          
            this.path.push(Object.create(element));
        });
        this.offset = (Math.random() * (0.55 - 0.45) + 0.45).toFixed(2);

        this.wasOffset = false;
        this.prevPosition = new Vector2();
        this.prevPath = [];
        this.dead=false;
        this.finished=false;
        this.spawned=false;
        this.damageToTurret=1;
        this.path.forEach(element => {
            element.offset(this.offset);
        });



    }
    spawn(delay) {
     
        setTimeout(()=>{ 
             this.spawned=true; 
            
        },delay)
      
    }
    update(time) {
  
        if(this.spawned){


        if (this.position.x == this.prevPosition.x && this.position.y == this.prevPosition.y) {
            this.prevPath.push(this.path.shift());
            if(this.path.length==0){
                this.finished=true;
                
            }
        }
        

        if (this.path.length == 0) {
            return false;
        }
        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;

        this.position.x += (Math.ceil(this.path[0].x - this.position.x) * time / 100 * this.movementSpeed)
        this.position.y += (Math.ceil(this.path[0].y - this.position.y) * time / 100 * this.movementSpeed)
    }
    }
}