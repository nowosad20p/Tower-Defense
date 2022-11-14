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

        <form method="POST" action="login.inc.php">
            <fieldset>
                <h2>LOGIN</h2>
                <input type="text" placeholder="username" name="username">
                <input type="password" placeholder="password" name="password">
                <input type="submit" name="submit">

            </fieldset>

        </form>
        <p class="errorMessage">
            <?php
           
        if(isset($_GET["error"])){
            echo str_replace("_"," ",$_GET["error"]);
        }
        ?></p>
        <a href="register.php">Register</a>

    </main>
</body>

</html>