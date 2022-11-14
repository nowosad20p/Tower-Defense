<?php
session_start();
ob_start();
require_once("../database/databaseConnection.php");
try{
if (!isset($_POST["username"]) || !isset($_POST["password"]) || !isset($_POST["submit"])) {
    throw new Exception("Empty_input");
}
$username = $_POST["username"];
$query = "SELECT * FROM users WHERE nickname = '$username'";
$result = mysqli_query($connection, $query);
if ($result->num_rows == 0) {
    throw new Exception("User_doesnt_exist");

} else {
    $row = $result->fetch_assoc();
    if (password_verify($_POST["password"], $row["user_password"])) {
        $_SESSION["user"] = $row["user_id"];
        header("location:../../lobby.html");
    } else {

       throw new Exception("Wrong_password");
    }
}
}
catch(Exception $ex){
    $exception=$ex->getMessage();
    header("location:login.php?error=$exception");
}