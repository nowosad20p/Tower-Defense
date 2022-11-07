
    <?php
    session_start();
    ob_start();
    require("../database/databaseConnection.php");
  
    $map_creator=$_SESSION["user"];
    $map_code=$_POST["mapCode"];
    $waves_code=$_POST["waveCode"];
    $image=$_POST["image"];
    $description=$_POST["description"];
    $title=$_POST["title"];
    $date_of_upload = date("Y/m/d");
    echo 'INSERT INTO maps(map_creator,map_code,waves_code,image,description,title,date_of_upload) VALUES ("'.$map_creator.'","'.$map_code.'",'."'".$waves_code."'".',"'.$image.'","'.$description.'"'.'","'.$title.'","'.$date_of_upload.');';
    $query='INSERT INTO maps(map_creator,map_code,waves_code,image,description,title,date_of_upload) VALUES ("'.$map_creator.'","'.$map_code.'",'."'".$waves_code."'".',"'.$image.'","'.$description.'","'.$title.'","'.$date_of_upload.'");';
    mysqli_query($connection,$query);
   
    header("Location:../../communityMaps.php");
    