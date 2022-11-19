<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Map Creator</title>

    <link rel="stylesheet" href="styles/mapCreators.css">

</head>

<body>
    
    <?php
    session_start();
    if (!isset($_SESSION["user"])) {
        header("location:php/account/login.php");
    }
    ?>
    <nav><img src="graphics/leftArrow.png" alt="back" id="previousStep"></div>
        <div id="mapFormNav" class="navActive">Map properties</div>
        <div id="mapCreatorNav">Map creator</div>
        <div id="wavesCreatorNav">Waves creator</div><img src="graphics/homeIcon.png" alt="home" id="home"></div>
    </nav>
    <script>
        document.querySelector("#previousStep").onclick = () => {
            window.location = "lobby.html";
        }
        document.querySelector("#home").onclick = () => {
            window.location = "index.html";
        }
    </script>
    <main>
        <form id="mapForm">
            <input type="text" id="title" placeholder="title">
            <input type="text" id="description" placeholder="description">
            <input type="text" id="width" placeholder="width">
            <input type="text" id="height" placeholder="height">
            <input type="submit">
        </form>

    </main>
    <input type="text" id="mapImage">

    <footer id="narzedzia">

        <button id="terrainBtn"><img src="graphics/tiles/grass.png"> </button>
        <button id="pathBtn"><img src="graphics/pathIcon.png"> </button>
        <button id="towerBtn"><img src="graphics/towers/towerSlot.png"> </button>
        <button id="campBtn"><img src="graphics/tiles/enemySpawn.png"> </button>
        <button id="baseBtn"><img src="graphics/tiles/playerBase.png"> </button>
       
        <button id="saveBtn">Save map</button>

    </footer>
    <script src="api/easystar.min.js"></script>
    <script src="datatypes/betterImage.js"></script>
    <script src="datatypes/vector.js"></script>
    <script src="utils/mathUtils.js"></script>
    <script src="utils/drawingUtils.js"></script>
    <script src="utils/inputUtils.js"></script>
    <script src="utils/timeUtils.js"></script>
    <script src="ui/button.js"></script>
    <script src="ui/temporaryText.js"></script>
    <script src="ui/towerButtonsContainer.js"></script>
    <script src="gameObjects/entities/entity.js"></script>
    <script src="gameObjects/entities/enemy.js"></script>
    <script src="gameObjects/entities/goblin.js"></script>
    <script src="gameObjects/waves/enemyGroup.js"></script>

    <script src="gameObjects/waves/wave.js"></script>
    <script src="other/preloadedImages.js"></script>
    <script src="converters/boardConverter.js"></script>
    <script src="converters/wavesConverter.js"></script>

    <script src="gameObjects/tiles/tile.js"></script>
    <script src="gameObjects/tiles/enemySpawn.js"></script>
    <script src="gameObjects/tiles/playerBase.js"></script>
    <script src="gameObjects/towers/towerSlot.js"></script>
    <script src="gameObjects/tiles/terrainTile.js"></script>
    <script src="gameObjects/towers/tower.js"></script>
    <script src="gameObjects/towers/mageTower.js"></script>
    <script src="gameObjects/towers/iceTower.js"></script>
    <script src="gameObjects/towers/archerTower.js"></script>
    <script src="gameObjects/towers/trooperTower.js"></script>

    <script src="gameObjects/tiles/pathTile.js"></script>
    <script src="gameObjects/board.js"></script>

    <script src="gameObjects/boardCreator.js"></script>
    <script src="gameObjects/wavesCreator.js"></script>

    <script src="mapCreator.js"></script>

</body>

</html>