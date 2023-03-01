function touching(object1,object2){
    if(((object1.x+25) <= (object2.x-50))||((object1.x-25) >= (object2.x+50))){
        return false;
    }
    else if(((object1.y+25) <= (object2.y-50))||((object1.y-25) >= (object2.y+50))){
        return false;
    }
    else{
        return true;
    }
}
function bounce(object1,object2){
    if(touching(object1,object2)){
        thing.velocityX = thing.velocityX*-1;
    }
}
