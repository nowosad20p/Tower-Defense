class Vector2{
    constructor(x=0,y=0){//saving x and y values
        this.x=x;
        this.y=y;
    }
    add(vector){//adding another vector to this vector
        this.x+=vector.x;
        this.y+=vector.x;
    }
    substract(vector){//substracting another vector from this vector
        this.x-=vector.x;
        this.y-=vector.x;
    }
    muptiply(number){//multiplying another vector to this vector
        this.x*=number;
        this.y*=number;
    }
    divide(number){//dividing another vector to this vector
        this.x/=number;
        this.y/=number;
    }
}
function distanceBetweenVectors(v1,v2){//calculating distance between two vectors
    let a=v2.x-v1.x;
    a*=Math.sign(a);
    let b=v2.x-v1.x;
    b*=Math.sign(a);
    return Math.sqrt(a^2+b^2);
}