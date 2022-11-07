//creating and starting board
localStorage.getItem("map_code") == null ? map_code = "" : map_code = localStorage.getItem("map_code");
localStorage.getItem("waves_code") == null ? waves_code = "" : waves_code = localStorage.getItem("waves_code");
console.log(map_code)
console.log(waves_code)

let board = new Board(map_code, waves_code, document.querySelector("canvas"), 240, document.querySelector("#moneyCount"), document.querySelector("#hpCount"), document.querySelector("#pauseMenu"))
console.log(map_code, waves_code)
window.onscroll = () => {
    window.scrollY == 0 ? document.querySelector("#moneyCount").style.position = "relative" : document.querySelector("#moneyCount").style.position = "fixed"
}

//setting up pause buttons
document.getElementById("resumeBtn").onclick = () => {
    board.resume()
}
document.getElementById("homeBtn").onclick = () => {
    window.location = "index.html"
}


board.startLevel();
/*
wieża maga - wieża maga który podpala, wskrzesza przeciwników, zadaje obrażenia kilku naraz(jak inferno tower w coc)
wieża lodu - wieża która ma aure która spowalnia, większy zasięg i dmg i slow, szybkie ataki, kumulujący się slow
mortar - większy zasięg i dmg, podrzuca całe pole, szansa na stuna, rzuca po kilka naraz
wieża ludzi - paladyni, bandyci, łucznicy, smok
Łucznik - daleko, szybko, zatruwa, salwy
*/