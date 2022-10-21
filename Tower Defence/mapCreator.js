let form = document.querySelector("#mapForm");
function createForm(){
    if(document.querySelectorAll("canvas").length!=0){
        document.querySelector("main").innerHTML="";
    }
    if(document.querySelectorAll("footer").length!=0){
        document.querySelector("footer").remove();
    }
    let newForm=document.createElement("form");
    newForm.id="mapForm";
    let widthInput=document.createElement("input");
    widthInput.type="text";
    widthInput.id="#width";
    let heightInput=document.createElement("input");
    heightInput.type="text";
    heightInput.id="#height";
    let submitBtn=document.createElement("input");
    submitBtn.type="submit";
    newForm.appendChild(widthInput);
    newForm.appendChild(heightInput);
    newForm.appendChild(submitBtn);

    document.querySelector("main").appendChild(newForm);

 
    

    
}
function mapEditor(){
    if(document.querySelectorAll("#width").length==0||document.querySelectorAll("#height").length==0){
        createForm();
        return false;
    }
let canvas = document.createElement("canvas");
let width = document.querySelector("#width").value;
let height = document.querySelector("#height").value;
//changing form to canvas
document.querySelector("main").appendChild(canvas);
document.querySelector("main").removeChild(form);

//creating board editor
let boardCreator = new BoardCreator(canvas, width, height)

//setting map creator buttons
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
    console.log(boardToString(boardCreator.board))
    localStorage.setItem("mapCode",boardToString(boardCreator.board))
    createForm();

}

}
function wavesEditor(){

}
//displaying editor after form is sent
form.onsubmit = () => {
    //getting needed values
    event.preventDefault();
    mapEditor();

}