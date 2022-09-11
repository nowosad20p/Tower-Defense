let form = document.querySelector("#mapForm");
//displaying editor after form is sent
form.onsubmit = () => {
    //getting needed values
    event.preventDefault();
    let canvas = document.createElement("canvas");
    let width = document.querySelector("#width").value;
    let height = document.querySelector("#height").value;
    //changing form to canvas
    document.querySelector("main").appendChild(canvas);
    document.querySelector("main").removeChild(form);

    //creating board editor
    let boardCreator = new BoardCreator(canvas, width, height)

    document.querySelector("#terrainBtn").onclick = () => {
        boardCreator.tileToSet = "terrain";
    }
    document.querySelector("#pathBtn").onclick = () => {
        boardCreator.tileToSet = "path";
    }
    document.querySelector("#towerBtn").onclick = () => {
        boardCreator.tileToSet = "tower";
    }
    document.querySelector("#campBtn").onclick = () => {
        boardCreator.tileToSet = "camp";
    }
    document.querySelector("#baseBtn").onclick = () => {
        boardCreator.tileToSet = "base";
    }
    document.querySelector("#saveBtn").onclick = () => {
        console.log(boardCreator.generateMapCode())
    }

}