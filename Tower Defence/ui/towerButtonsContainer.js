class TowerButtonsContainer {
    constructor(radius = 1, tower) {
        //saving needed informations
        this.position = undefined;

        let upgradeButton = new Button(new BetterImage("./graphics/towerButtons.png", 16, 16, new Vector2(0, 0)), 16, 16, new Vector2(0, 0), () => {
            console.log("ae")
        });
        let ae = new Button(new BetterImage("./graphics/towerButtons.png", 16, 16, new Vector2(0, 0)), 16, 16, new Vector2(0, 0), () => {
            console.log("aea")
        });



        this.buttons = [upgradeButton, ae];

        this.radius = radius * 1;

    }
}