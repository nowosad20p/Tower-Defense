//creating and starting board
let board = new Board("10w5h1 0 2 0 2 1 2 2 3 0 3 2 4 0 5 0 5 2 6 0 6 1 6 2p1 1 2 3 3 1 4 1 4 2 5 1t0 0 7 2s3 3e", document.querySelector("canvas"), 240, document.querySelector("#moneyCount"), document.querySelector("#hpCount"),document.querySelector("#pauseMenu"))

window.onscroll = () => {
    window.scrollY == 0 ? document.querySelector("#moneyCount").style.position = "relative" : document.querySelector("#moneyCount").style.position = "fixed"
}

//setting up pause buttons
document.getElementById("resumeBtn").onclick=()=>{board.resume()
}

board.startLevel();
/*
wieża maga - wieża maga który podpala, wskrzesza przeciwników, zadaje obrażenia kilku naraz(jak inferno tower w coc)
wieża lodu - wieża która ma aure która spowalnia, większy zasięg i dmg i slow, szybkie ataki, kumulujący się slow
mortar - większy zasięg i dmg, podrzuca całe pole, szansa na stuna, rzuca po kilka naraz
wieża ludzi - paladyni, bandyci, łucznicy, smok
Łucznik - daleko, szybko, zatruwa, salwy
*/