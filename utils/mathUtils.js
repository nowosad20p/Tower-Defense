function pointIntersectRectangle(point, leftTop, rightBot) { //returns true if point is inside of rectangle
    return (point.x >= leftTop.x && point.y >= leftTop.y && point.x <= rightBot.x && point.y <= rightBot.y);
}

function rectanglesIntersect(leftTop1, rightBot1, leftTop2, rightBot2) { //returns true if one rectangle is inside another
    return (
        pointIntersectRectangle(leftTop1, leftTop2, rightBot2) ||
        pointIntersectRectangle(rightBot1, leftTop2, rightBot2)

    )
}