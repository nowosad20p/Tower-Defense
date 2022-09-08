class TimeUtils{
    constructor(){
        //setting up time values
        this.deltaTime=0;
        let today = new Date();
        this.currentMs = today.getTime();
     
    }
    update(){
        //calculating how much time elapsed since last update
        let today = new Date();
        this.deltaTime=today.getTime()-this.currentMs;
      
        this.currentMs=today.getTime();
  
    }
}