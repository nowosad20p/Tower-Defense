<?php
require("../database/databaseConnection.php");
try{
if (!isset($_POST["username"]) || !isset($_POST["password"]) || !isset($_POST["submit"]) || !isset($_POST["repeatedPassword"]) || !isset($_POST["mail"]) || !isset($_POST["name"]) || !isset($_POST["surname"])) {
    throw new Exception("All inputs must be filled");
}
// if (!empty($_POST["username"]) || !empty($_POST["password"]) || !empty($_POST["repeatedPassword"]) || !empty($_POST["mail"]) || !empty($_POST["name"]) || !empty($_POST["surname"])) {
//     throw new Exception("All inputs must be filled");
// }
 //if(count($_POST["password"])<7){
   //  throw new Exception("Password_must_have_between_7_and_25_characters");
 //}
$firstname = $_POST["name"];
$surname = $_POST["surname"];
$nickname = $_POST["username"];
$email = $_POST["mail"];
$user_password = password_hash($_POST["password"], PASSWORD_DEFAULT);

$query = 'INSERT INTO users(firstname,surname,nickname,email,user_password) VALUES ("' . $firstname . '","' . $surname . '","' . $nickname . '","' . $email . '","' . $user_password . '");';
if(mysqli_query($connection,"SELECT * FROM users WHERE nickname LIKE '$nickname'")->num_rows>0){
    throw new Exception("User_already_exists");
}

if (mysqli_query($connection, $query)) {
    header("location:login.php");
} else {
   throw new Exception("Connection_to_database_failed");
}

}
catch(Exception $ex){
 
     $exception=$ex->getMessage();
     header("location:register.php?error=$exception");

}