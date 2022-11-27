//creating and starting board
localStorage.getItem("map_code") == null ? map_code = "" : map_code = localStorage.getItem("map_code");
localStorage.getItem("waves_code") == null ? waves_code = "" : waves_code = localStorage.getItem("waves_code");
let board = new Board(map_code, waves_code, document.querySelector("canvas"), 60, document.querySelector("#moneyCount"), document.querySelector("#hpCount"), document.querySelector("#pauseMenu"),document.querySelector("#endMenu"));

window.onscroll = () => {
    window.scrollY == 0 ? document.querySelector("#moneyCount").style.position = "relative" : document.querySelector("#moneyCount").style.position = "fixed"
}

//setting up pause buttons
document.querySelectorAll(".resumeBtn").forEach(element=>{element.onclick = () => {
    board.resume()

}
});
document.querySelectorAll(".homeBtn").forEach(element=>{element.onclick = () => {
    window.location = "index.html"
}});
document.querySelectorAll(".tryAgainBtn").forEach(element=>{element.onclick = () => {
    window.location=window.location;
}});


board.startLevel();

document.querySelector("#home").addEventListener("click", () => { board.pause() })

/*
wieża maga - wieża maga który podpala, wskrzesza przeciwników, zadaje obrażenia kilku naraz(jak inferno tower w coc)
wieża lodu - wieża która ma aure która spowalnia, większy zasięg i dmg i slow, szybkie ataki, kumulujący się slow
mortar - większy zasięg i dmg, podrzuca całe pole, szansa na stuna, rzuca po kilka naraz
wieża ludzi - paladyni, bandyci, łucznicy, smok
Łucznik - daleko, szybko, zatruwa, salwy
*/