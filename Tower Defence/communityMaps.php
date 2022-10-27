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
    <h1>COMMUNITY MAPS</h1>
    <div class="maps">
<?php
session_start();
require("php/database/databaseConnection.php");
$query="SELECT * FROM maps";
$result = mysqli_query($connection,$query);
while($row=$result->fetch_assoc()){

$mapName=$row["title"];
$author=$row["map_creator"];
$image=$row["image"];
$description=$row["description"];

echo "<div class='mapContainer'>";
echo "<div class='title'>$mapName</div>";
echo "<div class='author'>$author</div>";

echo "<div class='image'><img src='$image'></div>";
echo "<div class='description'>$description</div>";


echo"</div>";

}
?>
</div>
</body>
</html>
