
    <?php
session_start();
    
    require("../database/databaseConnection.php");
  
    $map_creator=$_SESSION["user"];
    $map_code=$_POST["mapCode"];
    $waves_code=$_POST["waveCode"];
    $image=$_POST["image"];
    $description="ae";
    $title="ae";
    $date_of_upload = date("Y/m/d");
    echo 'INSERT INTO maps(map_creator,map_code,waves_code,image,description,title,date_of_upload) VALUES ("'.$map_creator.'","'.$map_code.'",'."'".$waves_code."'".',"'.$image.'","'.$description.'"'.'","'.$title.'","'.$date_of_upload.');';
    $query='INSERT INTO maps(map_creator,map_code,waves_code,image,description,title,date_of_upload) VALUES ("'.$map_creator.'","'.$map_code.'",'."'".$waves_code."'".',"'.$image.'","'.$description.'","'.$title.'","'.$date_of_upload.'");';
    mysqli_query($connection,$query);
    echo mysqli_error($connection);
    header("location:../../communityMaps.php");
    ?>
