class WavesCreator {
    constructor(container, createWaveBtn, position = new Vector2(0, 0)) {
        this.position = position;
        this.container = container;
        this.enemies = ["goblin", "bat", "orc", "villager", "fireSpirit", "ghost","amogus"];
  
        createWaveBtn.onclick = () => {
            this.createWave()
        };
    }
    createWave() {
        let wave = document.createElement("div");
        wave.className = "waveDiv";
        let h2 = document.createElement("h2");
        h2.innerHTML = "Wave"
        wave.appendChild(h2);
        let groupsContainer = document.createElement("div");
        groupsContainer.className = "groupsContainer";
        let newGroupBtn = document.createElement("button");
        newGroupBtn.onclick = this.createGroup;
        newGroupBtn.innerHTML = "Create group";
        newGroupBtn.className = "groupBtn";
        newGroupBtn.onclick = () => {
            this.createGroup(groupsContainer)
        }
        wave.appendChild(groupsContainer);
        wave.appendChild(newGroupBtn);

        this.container.appendChild(wave)
    }
    createGroup(waveContainer) {
        let group = document.createElement("div");
        group.className = "groupDiv";
        let h3 = document.createElement("h3");
        h3.innerHTML = "Group"
        group.appendChild(h3);

        let delayInput = document.createElement("input");
        delayInput.type = "number";
        delayInput.className = "delay";
        delayInput.value = 0;
        group.appendChild(document.createTextNode("Delay:"));
        group.appendChild(delayInput);

        let spawnRatioInput = document.createElement("input");
        spawnRatioInput.type = "number";
        spawnRatioInput.className = "spawnRatio";
        spawnRatioInput.value = 0;

        group.appendChild(document.createTextNode("Spawn ratio:"));
        group.appendChild(spawnRatioInput);

        let list = document.createElement("ul");
        this.enemies.forEach(element => {
            let li = document.createElement("li");
            let liInput = document.createElement("input");
            liInput.type = "number";
            liInput.className = "enemyNumber";
            liInput.value = 0;

            li.innerHTML = element;
            li.appendChild(liInput);
            list.appendChild(li);
        })
        group.appendChild(list)
        waveContainer.appendChild(group);
        this.getCode()
    }
    getCode() {
        let code = "(" + this.position.x + "," + this.position.y + ")";

        let waves = this.container.querySelectorAll(".waveDiv");

        waves.forEach(element => {
            code += "{";
            let groups = element.querySelectorAll(".groupDiv");
            groups.forEach(group => {

                code += "<" + group.querySelector(".delay").value * 1000 + "," + group.querySelector(".spawnRatio").value * 1000 + ">";
                code += "[";

                for (let i = 0; i < this.enemies.length; i++) {
                    for (let j = 0; j < group.querySelectorAll(".enemyNumber")[i].value; j++) {
                        code += '"' + this.enemies[i] + '",';

                    }
                }

                code = code.slice(0, -1)

                code += "]";

            })
            code += "}";

        })

        return code;
    }
}