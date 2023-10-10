

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const verifyIfBotIsInsideArena = (botSet) => {
    botSet.translateX = clamp(botSet.translateX, botSet.positions.minArenaX, botSet.positions.maxArenaX);
    botSet.translateY = clamp(botSet.translateY, botSet.positions.minArenaY, botSet.positions.maxArenaY);
};


const buildHitBox = (botSet) => {
    const element = document.getElementById(botSet.class);
    const rect = element.getBoundingClientRect();

    const hitBox = {
        superiorLeftX: rect.left,
        superiorLeftY: rect.top,
        inferiorRightX: rect.right,
        inferiorRightY: rect.bottom,
    };

    return hitBox;
};

// ====================================== colision functions ======================================
const createOverlap = (bot1, bot2) => {
    const hitBox1 = buildHitBox(bot1);
    const hitBox2 = buildHitBox(bot2);

    const overlapX = Math.min(hitBox1.inferiorRightX, hitBox2.inferiorRightX) - Math.max(hitBox1.superiorLeftX, hitBox2.superiorLeftX);
    const overlapY = Math.min(hitBox1.inferiorRightY, hitBox2.inferiorRightY) - Math.max(hitBox1.superiorLeftY, hitBox2.superiorLeftY);

    const overLapValue = 0.7;

    if (overlapX > overlapY) {
        if (bot1.translateX < bot2.translateX) {
            bot1.translateX -= overlapX / overLapValue;
            bot2.translateX += overlapX / overLapValue;
        } else {
            bot1.translateX += overlapX / overLapValue;
            bot2.translateX -= overlapX / overLapValue;
        }
    } else {
        if (bot1.translateY < bot2.translateY) {
            bot1.translateY -= overlapY / overLapValue;
            bot2.translateY += overlapY / overLapValue;
        } else {
            bot1.translateY += overlapY / overLapValue;
            bot2.translateY -= overlapY / overLapValue;
        }
    }
};

const detectCollision = (bot1, bot2) => {
    const hitBox1 = buildHitBox(bot1);
    const hitBox2 = buildHitBox(bot2);

    const collisionX = (
        hitBox1.inferiorRightX > hitBox2.superiorLeftX &&
        hitBox1.superiorLeftX < hitBox2.inferiorRightX
    );

    const collisionY = (
        hitBox1.inferiorRightY > hitBox2.superiorLeftY &&
        hitBox1.superiorLeftY < hitBox2.inferiorRightY
    );

    return { collisionX, collisionY };
};

let collisionOccurred = false;  

const verifyCrash = (bot1, bot2) => {
    const { collisionX, collisionY } = detectCollision(bot1, bot2);

    if (collisionX && collisionY && !collisionOccurred) {
        createOverlap(bot1, bot2);
        collisionOccurred = true; 
        return true;
    }

    if (!collisionX || !collisionY) {
      
        collisionOccurred = false;
    }

    return false;
};


export const updateBotLife = (botSet) => {
    
    const lifeSpan = document.getElementById(`life-${botSet.class}`);
    if(lifeSpan){
        lifeSpan.textContent = `${botSet.id.toUpperCase()} - HP: ${botSet.life}`;
    }
}

const loseHpOnCrash = (crash, bot1, bot2) => {
    if (crash) {
        bot1.life -= 2;
        bot2.life -= 2;
        updateBotLife(bot1);
        updateBotLife(bot2);
    }
    
}

export const updateColisionCounter = (colision) => {
    const colisionCounterHTML = document.querySelector('#colision__counter');

    colisionCounterHTML.textContent = Number(colision);

}

export function colision (botId, botSets) {
    verifyIfBotIsInsideArena(botId);
    buildHitBox(botId);
    const [bot1, bot2] = botSets; 
    let crash = verifyCrash(bot1, bot2); 
    loseHpOnCrash(crash, bot1, bot2); 
    return crash;
}