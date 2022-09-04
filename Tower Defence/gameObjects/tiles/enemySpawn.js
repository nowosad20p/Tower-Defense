class EnemySpawn extends Tile{
    constructor(image,waves){
        super(image);
        this.tileWidth = 32;
        this.tileHeight = 32;
        this.waves=waves;
    }
    sendWave(waveNumber){
        this.waves[waveNumber].forEach(element => {
            element.spawn();
        });
    }
    findPath(startPoint,endPoint,board){
        let path=[];

        return path;
    }
}