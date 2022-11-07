<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Levels</title>
    <link rel="stylesheet" href="styles/levels.css">
</head>
<body>
    <main>
        <div id="levelsContainer">
            <h1>CHOOSE LEVEL</h1>
            <?php
    require("php/database/databaseConnection.php");
    $query = "SELECT * FROM levels";
    $levels=mysqli_query($connection,$query);
    while($row=mysqli_fetch_assoc($levels)){
        $mapCode=$row["map_code"];
        $wavesCode=$row["waves_code"];

        echo "<div class='level'>".$row["level_id"]."<input type='hidden' class='mapCode' value='$mapCode'><input type='hidden' class='wavesCode' value='$wavesCode'></div>";

    }
   ?>
        </div>
    </main>
    <script>
        let buttons=document.querySelectorAll(".level");
        for(let i=0;i<buttons.length;i++){
            buttons[i].onclick=()=>{loadLevel( buttons[i].querySelector(".mapCode").value, buttons[i].querySelector(".wavesCode").value)}

        }
       
            
            

   
        function loadLevel(mapCode,wavesCode){
            localStorage.setItem("map_code",mapCode);
            localStorage.setItem("waves_code",wavesCode);
            //console.log(mapCode,wavesCode)
            window.location="game.html";

        }
    </script>
</body>
</html>