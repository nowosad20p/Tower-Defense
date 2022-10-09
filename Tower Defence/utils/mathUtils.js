function pointIntersectRectangle(point, leftTop, rightBot) { //returns true if point is inside of rectangle
    return (point.x > leftTop.x && point.y > leftTop.y && point.x < rightBot.x && point.y < rightBot.y);
}