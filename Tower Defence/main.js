//let board=new Board(15,7,document.querySelector("canvas"),"12","000102031113212223203132","00",[3,3],5);
let board = new Board("10w5h1 0 1 1 1 2 2 0 2 1 3 1 3 2 3 3 4 0 4 1 4 2 4 3 5 0 5 2 6 0 6 1 6 3 7 1 7 2 7 3p2 2 3 0 5 1t0 0s5 3e", document.querySelector("canvas"), 5)



board.startLevel();
/*
wieża maga - wieża maga który podpala, wskrzesza przeciwników, zadaje obrażenia kilku naraz(jak inferno tower w coc)
wieża lodu - wieża która ma aure która spowalnia, większy zasięg i dmg i slow, szybkie ataki, kumulujący się slow
mortar - większy zasięg i dmg, podrzuca całe pole, szansa na stuna, rzuca po kilka naraz
wieża ludzi - paladyni, bandyci, łucznicy, smok
Łucznik - daleko, szybko, zatruwa, salwy
*/