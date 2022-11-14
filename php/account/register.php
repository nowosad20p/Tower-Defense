<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="../../styles/forms.css">

</head>

<body>
    <nav><img id="home" src="../../graphics/homeIcon.png" alt="home"></nav>

    <script>
        document.querySelector("#home").addEventListener("click", () => {
            window.location = "../../index.html";
        });
    </script>
    <main>

        <form method="POST" action="register.inc.php">
            <fieldset>
                <h2>Register</h2>
                <input type="text" placeholder="username" name="username">
                <input type="password" placeholder="password" name="password">
                <input type="password" placeholder="password" name="repeatedPassword">
                <input type="mail" placeholder="aaa@aaa.aaa" name="mail">
                <input type="text" placeholder="name" name="name">
                <input type="text" placeholder="surname" name="surname">
                <input type="submit" name="submit">

            </fieldset>

        </form>
        <p class="errorMessage">
        <?php
        if(isset($_GET["error"])){
            echo str_replace("_"," ",$_GET["error"]);
        }
        ?>
        </p>
        <a href="login.php">Login</a>

    </main>
</body>

</html>