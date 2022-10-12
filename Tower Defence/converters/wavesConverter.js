function stringToWave(string) {
   

    let result = [];
    let waves=[];
    for (let i = 0; i < string.length; i++) {
      
        if (string[i] == "(") { //getting spawn position
            if(result.length!=0){
                result.push(waves);
                waves=[];
            }
            i++;
            let x = y = "";


            while (string[i] != ",") {
                x += string[i].toString();
                i++;
            }
            i++
            while (string[i] != ")") {
                y += string[i].toString();
                i++;
            }
           
            let position = new Vector2(x, y);
            result.push(position);
        }
       
        if (string[i] == "{") { //getting wave
            let wave = new Wave([]);
            let delay, ratio;
            delay=ratio="";
            while (string[i] != "}") {
                
                if (string[i] == "<") { //getting group settings
                    i++;
                    while (string[i] != ",") {
                        delay+=string[i].toString();
                        i++;
                    }
                    i++;
                    while (string[i] != ">") {
                        ratio+=string[i].toString();

                        i++;
                    }
                    i++;
                   
                }
                if(string[i]=="["){
                    i++;
                    let group = new EnemyGroup([],delay*1,ratio*1);
                    delay="";
                    ratio="";
                   
                    let enemy="";
                    while(string[i]!="]"){
                        if(string[i]==","){
                            group.enemies.push(enemy);
                            enemy="";
                        }else{
                            if(string[i]!='"'&&string[i]!="'"){
                            enemy+=string[i];
                            }
                        }
                        i++;
                    }
                    group.enemies.push(enemy);
                    enemy="";

                    wave.groups.push(group);
                }
                i++;

            }

            waves.push(wave);
        }

    }
    result.push(waves);
 
    return result;
}


function wavesToString(spawners) {

}