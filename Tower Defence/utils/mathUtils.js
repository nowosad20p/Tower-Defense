function pointIntersectRectangle(point,leftTop,rightBot){
    return (point.x>leftTop.x&&point.y>leftTop.y&&point.x<rightBot.x&&point.y<rightBot.y);
}
