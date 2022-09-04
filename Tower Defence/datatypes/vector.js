class Vector2{
    constructor(x=0,y=0){
        this.x=x;
        this.y=y;
    }
    add(vector){
        this.x+=vector.x;
        this.y+=vector.x;
    }
    substract(vector){
        this.x-=vector.x;
        this.y-=vector.x;
    }
    muptiply(number){
        this.x*=number;
        this.y*=number;
    }
    divide(number){
        this.x/=number;
        this.y/=number;
    }
}
function distanceBetweenVectors(v1,v2){
    let a=v2.x-v1.x;
    a*=Math.sign(a);
    let b=v2.x-v1.x;
    b*=Math.sign(a);
    return Math.sqrt(a^2+b^2);
}