class ANode{
    constructor(left,right,bottom,top,isWalkable,id){
        this.left=left;
        this.right=right;
        this.bottom=bottom;
        this.top=top;
        this.isWalkable=isWalkable;
        this.id=id;
        this.gCost;
        this.hCost;
        this.fCost;
    }
}
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
       let startNode = this.getNodeBoard(board,startPoint);
    
        let open=[startNode];
        let current=startNode;
     

        let closed;
        let pathFound=false;
       
        while(!pathFound){
            let current = this.getLowestNode(open);
           // this.calculateNodesValues([current.left,current.right,current.top,current.bottom],endPoint,startPoint);
            break;
        }
    }
    calculateNodesValues(nodes,endPoint,startPoint){
        
      for(let i=0;i<nodes.length;i++){
        if(nodes[i]!=undefined){
        //G cost - distance from end node
      
        
        let xDistanceFromStart=nodes[i].id.x-startPoint.x;
        xDistanceFromStart*=Math.sign(xDistanceFromStart);
            
        let yDistanceFromStart=nodes[i].id.y-startPoint.y;
        yDistanceFromStart*=Math.sign(yDistanceFromStart);
    
        nodes[i].gCost=xDistanceFromStart+yDistanceFromStart;
        //H cost - distance from start node
        let xDistanceFromEnd=nodes[i].id.x-endPoint.x;
        xDistanceFromEnd*=Math.sign(xDistanceFromEnd);
        let yDistanceFromEnd=nodes[i].id.y-endPoint.y;
        yDistanceFromEnd*=Math.sign(yDistanceFromEnd);
        console.log(xDistanceFromEnd,yDistanceFromEnd)
        nodes[i].hCost=xDistanceFromEnd+yDistanceFromEnd;

        //F cost - sum of G and H cost
        nodes[i].fCost=nodes[i].gCost+nodes[i].hCost;
        
        }
      }
      console.log(nodes);
    }
    getLowestNode(nodes){
        let lowest=[nodes[0]];
        for(let i=1;i<nodes.length;i++){
            if(nodes[i].fCost==lowest[0].fCost){
                lowest.push(nodes[i]);
            }
            if(nodes[i].fCost<lowest[0].fCost){
                lowest=[nodes[i]];
            }
            
        }
        let lowestSingleNode=lowest[0];
        for(let i=0;i<lowest.length;i++){
           
            if(lowest[i].hCost<lowestSingleNode.hCost){
                lowestSingleNode=lowest[i];
            }
            
        }
        return lowestSingleNode;
    }
    getNodeBoard(board,startPoint){
        let nodeBoard=[];
        let startNode;
        for(let i=0;i<board.length;i++){
            let nodeArray=[];
            for(let j=0;j<board[i].length;j++){
                nodeArray.push(new ANode());
            }
            nodeBoard.push(nodeArray);
        }
        for(let i=0;i<board.length;i++){
            for(let j=0;j<board[i].length;j++){
                nodeBoard[i][j].left = i > 0 ? nodeBoard[i - 1][j] : undefined;
                nodeBoard[i][j].top = j > 0 ? nodeBoard[i][j - 1] : undefined;
                nodeBoard[i][j].right = i < nodeBoard.length - 1 ? nodeBoard[i + 1][j] : undefined;
                nodeBoard[i][j].bottom = j < nodeBoard[0].length - 1 ? nodeBoard[i][j + 1] : undefined;
                if(i==startPoint.x&&j==startPoint.y){
                    startNode=nodeBoard[i][j];
                }
                nodeBoard[i][j].isWalkable= (board[i][j] instanceof PathTile);
                nodeBoard[i][j].id=new Vector2(i,j);
                

                
            }
        }
        return startNode;
        
    }
    
    
}
