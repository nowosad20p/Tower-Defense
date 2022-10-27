let form = document.querySelector("#mapForm");
console.log(document.querySelector("footer"))

document.querySelector("footer").style.display = "none";

function createForm() {
    if (document.querySelectorAll("canvas").length != 0) {
        document.querySelector("main").innerHTML = "";
    }
    let newForm = document.createElement("form");
    newForm.id = "mapForm";
    document.querySelector("footer").style.display = "none";


    let widthInput = document.createElement("input");
    widthInput.type = "text";
    widthInput.id = "#width";
    widthInput.placeholder = "width";

    let heightInput = document.createElement("input");
    heightInput.type = "text";
    heightInput.id = "#height";
    widthInput.placeholder = "width";

    let submitBtn = document.createElement("input");
    submitBtn.type = "submit";

    newForm.appendChild(widthInput);
    newForm.appendChild(heightInput);
    newForm.appendChild(submitBtn);

    document.querySelector("main").appendChild(newForm);





}

function mapEditor() {
    document.querySelector("footer").style.display = "block";

    if (document.querySelectorAll("#width").length == 0 || document.querySelectorAll("#height").length == 0) {
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
        localStorage.setItem("mapCode", boardToString(boardCreator.board)[0])
        localStorage.setItem("spawners", JSON.stringify(boardToString(boardCreator.board)[1]))
        localStorage.setItem("image",canvas.toDataURL());
        wavesEditor();

    }

}

function wavesEditor() {
    document.querySelector("footer").style.display = "none";
    if (document.querySelectorAll("canvas").length != 0) {
        document.querySelector("main").innerHTML = "";
    }

    let spawners = JSON.parse(localStorage.getItem("spawners"));
    let waveCreators = [];

    spawners.forEach(element => {
        let waveContainer = document.createElement("div");
        let newWaveBtn = document.createElement("button");
        newWaveBtn.innerHTML = "Create new wave"
        waveCreators.push(new WavesCreator(waveContainer, newWaveBtn, new Vector2(element.x, element.y)))
        document.querySelector("main").appendChild(waveContainer)
        document.querySelector("main").appendChild(newWaveBtn);
    })
    let saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Save";
    saveBtn.onclick = () => {
        finish(waveCreators)
    }
    document.querySelector("main").appendChild(saveBtn);

}

function finish(waveCreators) {
    let code = "";

    waveCreators.forEach(element => {
        code += element.getCode();
    })
    let form = document.createElement("form");
    form.action = "php/maps/uploadMap.php";
    form.method = "POST";
    document.querySelector("body").appendChild(form);
    let mapCode = document.createElement("input");
    mapCode.type = "text";
    mapCode.name = "mapCode";
    let waveCode = document.createElement("input");
    waveCode.type = "text";
    waveCode.name = "waveCode";
    let image = document.createElement("input");
    image.type = "text";
    image.name = "image";
    image.value=localStorage.getItem("image");
    mapCode.value=localStorage.getItem("mapCode");
    waveCode.value=code;
    form.appendChild(image);
    form.appendChild(mapCode);
    form.appendChild(waveCode);

    form.submit();

    return code;

}
//displaying editor after form is sent
form.onsubmit = () => {
    //getting needed values
    event.preventDefault();
    mapEditor();

}