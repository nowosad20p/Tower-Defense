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


        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)).toFixed(5);
    }

    function directionVectorPercents(v1, v2) { //returns what percent of ms should be added to x and y, to achieve vector2
      
        let result = new Vector2();
        let x = v2.x - v1.x;
        x *= Math.sign(x);
        let y = v2.y - v1.y;
        y *= Math.sign(y);

        result.x = x / (x + y);
        result.y = y / (x + y);
        v2.x - v1.x < 0 ? result.x *= -1 : result.x *= 1;
        v2.y - v1.y < 0 ? result.y *= -1 : result.y *= 1;
    

        return result;
    }