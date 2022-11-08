<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    session_start();
    require("../database/databaseConnection.php");


    $map = $_POST["id"];
    echo $map;
    $query = "SELECT * FROM maps WHERE map_id=$map";
    $result = mysqli_query($connection, $query)->fetch_assoc();
    $map_code = $result["map_code"];
    $waves_code = $result["waves_code"];

    echo "<script>localStorage.setItem('map_code','$map_code');localStorage.setItem('waves_code','$waves_code');console.log(localStorage.getItem('map_code'));</script>";
    echo "<script>window.location='../../game.html'</script>";

    ?>

</body>

</html>