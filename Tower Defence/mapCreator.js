let form=document.querySelector("#mapForm");
form.onsubmit=()=>{event.preventDefault();
    let canvas = document.createElement("canvas");
    let width = document.querySelector("#width").value;
    let height = document.querySelector("#height").value;

    document.querySelector("main").appendChild(canvas);
    document.querySelector("main").removeChild(form);
    canvas.width=window.innerWidth;
    canvas.height=window.innerWidth/width*height;
    let boardCreator = new BoardCreator(canvas,width,height)
    document.querySelector("#terrainBtn").onclick=()=>{boardCreator.tileToSet="terrain";}
    document.querySelector("#pathBtn").onclick=()=>{boardCreator.tileToSet="path";}
    document.querySelector("#towerBtn").onclick=()=>{boardCreator.tileToSet="tower";}
    document.querySelector("#campBtn").onclick=()=>{boardCreator.tileToSet="camp";}
    document.querySelector("#baseBtn").onclick=()=>{boardCreator.tileToSet="base";}
}

