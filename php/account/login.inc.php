<?php
session_start();
require_once("../database/databaseConnection.php");
if(!isset($_POST["username"])||!isset($_POST["username"])||!isset($_POST["submit"])){
    header("location:login.php"); 
}
$username=$_POST["username"];
$query = "SELECT * FROM users WHERE nickname = '$username'";
$result=mysqli_query($connection,$query);
if($result->num_rows==0){
    header("location:login.php");
}else{
    $row=$result->fetch_assoc();
    if(password_verify($_POST["password"],$row["user_password"])){
        $_SESSION["user"]=$row["user_id"];
        header("location:../../game.html");
    }else{
        
       // header("location:login.php");

    }
    
    
}
?>