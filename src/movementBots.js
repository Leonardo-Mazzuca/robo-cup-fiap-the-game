function addMovementToLeftBot(evt, botSet){

    if(botSet.class === 'bot-left'){
        if (evt.key === 'w') {
            botSet.translateY -= botSet.speed;
        } else if (evt.key === 's') {
            botSet.translateY += botSet.speed;
        } else if (evt.key === 'a') {
            botSet.translateX -= botSet.speed;
        } else if (evt.key === 'd') {
            botSet.translateX += botSet.speed;
        }

    }

}

function addMovementToRightBot(evt, botSet){
    if(botSet.class === 'bot-right'){

        if (evt.key === 'ArrowUp' || evt.keyCode === 38) {
            botSet.translateY -= botSet.speed;
        } else if (evt.key === 'ArrowDown' || evt.keyCode === 40) {
            botSet.translateY += botSet.speed;
        } else if (evt.key === 'ArrowLeft' || evt.keyCode === 37) {
            botSet.translateX -= botSet.speed;
        } else if (evt.key === 'ArrowRight' || evt.keyCode === 39) {
            botSet.translateX += botSet.speed;
        }

    }
}

export function addMovement(evt, botId) {

    addMovementToLeftBot(evt,botId);
    addMovementToRightBot(evt,botId);
}