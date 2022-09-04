//let board=new Board(15,7,document.querySelector("canvas"),"12","000102031113212223203132","00",[3,3],5);
let board=new Board("15w7h0 0 0 1 0 2 0 3 1 1 1 3 2 1 2 2 2 3 2 0 3 1 3 2p1 2t0 0s3 3e",document.querySelector("canvas"),5)
board.startLevel();
/*
wieża maga - wieża maga który podpala, wskrzesza przeciwników, zadaje obrażenia kilku naraz(jak inferno tower w coc)
wieża lodu - wieża która ma aure która spowalnia, większy zasięg i dmg i slow, szybkie ataki, kumulujący się slow
mortar - większy zasięg i dmg, podrzuca całe pole, szansa na stuna, rzuca po kilka naraz
wieża ludzi - paladyni, bandyci, łucznicy, smok
Łucznik - daleko, szybko, zatruwa, salwy
*/