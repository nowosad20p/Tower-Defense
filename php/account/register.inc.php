<?php
require("../database/databaseConnection.php");
if (!isset($_POST["username"]) || !isset($_POST["password"]) || !isset($_POST["submit"]) || !isset($_POST["repeatedPassword"]) || !isset($_POST["mail"]) || !isset($_POST["name"]) || !isset($_POST["surname"])) {
    header("location:register.php");
}
$firstname = $_POST["name"];
$surname = $_POST["surname"];
$nickname = $_POST["username"];
$email = $_POST["mail"];
$user_password = password_hash($_POST["password"], PASSWORD_DEFAULT);

$query = 'INSERT INTO users(firstname,surname,nickname,email,user_password) VALUES ("' . $firstname . '","' . $surname . '","' . $nickname . '","' . $email . '","' . $user_password . '");';
echo ($name . $surname . $nickname . $email . $password);

if (mysqli_query($connection, $query)) {
    header("location:login.php");
} else {
    echo (mysqli_error($connection));
}
