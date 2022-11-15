let form = document.querySelector("#mapForm");
console.log(document.querySelector("footer"))

document.querySelector("footer").style.display = "none";


function createForm() {
    document.querySelector("#previousStep").onclick = () => {
        window.location = "lobby.html";
    }
    document.querySelector("#mapCreatorNav").className = "";
    document.querySelector("#wavesCreatorNav").className = "";
    document.querySelector("#mapFormNav").className = "navActive";

    if (document.querySelectorAll("canvas").length != 0) {
        document.querySelector("main").innerHTML = "";
    }
    let newForm = document.createElement("form");
    newForm.id = "mapForm";
    document.querySelector("footer").style.display = "none";


    //<input type="text" id="title" placeholder="title">
    //</input><input type="text" id="description" placeholder="description"></input>

    let titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "title";
    titleInput.placeholder = "title";

    let descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.id = "description";
    descriptionInput.placeholder = "description";

    let widthInput = document.createElement("input");
    widthInput.type = "text";
    widthInput.id = "width";
    widthInput.placeholder = "width";

    let heightInput = document.createElement("input");
    heightInput.type = "text";
    heightInput.id = "height";
    widthInput.placeholder = "width";

    let submitBtn = document.createElement("input");
    submitBtn.type = "submit";

    newForm.appendChild(titleInput);
    newForm.appendChild(descriptionInput);
    newForm.appendChild(widthInput);
    newForm.appendChild(heightInput);
    newForm.appendChild(submitBtn);

    document.querySelector("main").appendChild(newForm);






}

function mapEditor() {
    document.querySelector("#previousStep").onclick = () => {
        createForm();
    }
    document.querySelector("#mapCreatorNav").className = "navActive";
    document.querySelector("#wavesCreatorNav").className = "";
    document.querySelector("#mapFormNav").className = "";
    document.querySelector("footer").style.display = "block";

    if (document.querySelectorAll("#width").length == 0 || document.querySelectorAll("#height").length == 0) {
        createForm();
        return false;
    }
    let canvas = document.createElement("canvas");
    let width = document.querySelector("#width").value;
    let height = document.querySelector("#height").value;
    localStorage.setItem("description",document.querySelector("#description").value);
    localStorage.setItem("title",document.querySelector("#title").value);

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
        localStorage.setItem("image", canvas.toDataURL());
        wavesEditor();

    }

}

function wavesEditor() {
    document.querySelector("#previousStep").onclick = () => {
        mapEditor();
    }
    document.querySelector("#mapCreatorNav").className = "";
    document.querySelector("#wavesCreatorNav").className = "navActive";
    document.querySelector("#mapFormNav").className = "";
    document.querySelector("footer").style.display = "none";
    if (document.querySelectorAll("canvas").length != 0) {
        document.querySelector("main").innerHTML = "";
    }

    let spawners = JSON.parse(localStorage.getItem("spawners"));
    let waveCreators = [];

    spawners.forEach(element => {
        let h2 = document.createElement("h2");
        h2.innerHTML = element.x + "," + element.y;

        let waveContainer = document.createElement("div");
        let newWaveBtn = document.createElement("button");
        newWaveBtn.innerHTML = "Create new wave"
        waveCreators.push(new WavesCreator(waveContainer, newWaveBtn, new Vector2(element.x, element.y)))
        document.querySelector("main").appendChild(h2)

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
    let title = document.createElement("input");
    title.type = "text";
    title.name = "title";
    let description = document.createElement("input");
    description.type = "text";
    description.name = "description";
    //setting up values
    image.value = localStorage.getItem("image");
    mapCode.value = localStorage.getItem("mapCode");
    description.value = localStorage.getItem("description");
    title.value = localStorage.getItem("title");

    waveCode.value = code;
    form.appendChild(image);
    form.appendChild(mapCode);
    form.appendChild(waveCode);
    form.appendChild(title);
    form.appendChild(description);

    form.submit();

    //return code;

}
//displaying editor after form is sent
form.onsubmit = () => {
    //getting needed values
    event.preventDefault();
    mapEditor();

}