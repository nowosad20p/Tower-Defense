class TowerButtonsContainer{
    constructor(radius=1,tower){
        let img=new Image();
        this.position=undefined;
        img.src="./graphics/towerButtons.png";
        let upgradeButton=new Button(img,16,16,new Vector2(0,0),()=>{console.log("ae")});
        let ae=new Button(img,16,16,new Vector2(0,0),()=>{console.log("ae")});


        this.buttons=[upgradeButton,ae];
        
        this.radius=radius*1;
     
    }
}