    class Vector2 {
    constructor(x = 0, y = 0) { //saving x and y values
        this.x = x * 1;
        this.y = y * 1;
    }
    add(vector) { //adding another vector to this vector
        this.x += vector.x;
        this.y += vector.x;
    }
    substract(vector) { //substracting another vector from this vector
        this.x -= vector.x;
        this.y -= vector.x;
    }
    muptiply(number) { //multiplying another vector to this vector
        this.x *= number;
        this.y *= number;
    }
    divide(number) { //dividing another vector to this vector
        this.x /= number;
        this.y /= number;
    }
    offset(offset) {

        offset *= 1

        this.x += offset;
        this.y += 1 - offset;


    }
}

function distanceBetweenVectors(v1, v2) { //calculating distance between two vectors

    let a = v2.x - v1.x;
  
    let b = v2.y - v1.y;


    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}