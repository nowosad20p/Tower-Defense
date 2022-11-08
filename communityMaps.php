<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/communityMaps.css">
    <title>Community Maps</title>
</head>

<body>
    <nav><img id="home" src="graphics/homeIcon.png" alt="home"></nav>
    <script>
        document.querySelector("#home").addEventListener("click", () => {
            window.location = "index.html";
        });
    </script>
    <h1>COMMUNITY MAPS</h1>
    <div class="maps">
        <?php
        session_start();
        require("php/database/databaseConnection.php");
        $query = "SELECT title, image, description, map_id, nickname FROM maps INNER JOIN users on users.user_id=maps.map_creator";
        $result = mysqli_query($connection, $query);
        while ($row = $result->fetch_assoc()) {

            $mapName = $row["title"];
            $author = $row["nickname"];
            $image = $row["image"];
            $description = $row["description"];
            $id = $row["map_id"];
            echo "<div class='mapContainer'>";
            echo "<div class='title'>$mapName</div>";
            echo "<div class='author'>$author</div>";

            echo "<div class='image'><img src='$image'></div>";
            echo "<div class='description'>$description</div>";
            echo "<input type='hidden' value=$id>";
            echo "<button>PLAY</button>";
            echo "<script>a = document.querySelectorAll('button');a[a.length-1].onclick=()=>{
let form = document.createElement('form');
form.action='php/maps/loadMap.php';
form.method='POST';
let id = document.createElement('input');
id.name='id';
id.value=$id;
form.appendChild(id);
document.querySelector('body').appendChild(form);
form.submit();
}</script>";
            echo "</div>";
        }
        ?>
    </div>
</body>

</html>