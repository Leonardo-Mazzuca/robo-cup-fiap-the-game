
import { addExclamationPointerToColisionBox, addSplashEffectOnDamageToColisionBox, addVisibilityToPontuation } from "./animation";
import { colision, updateBotLife, updateColisionCounter } from "./colision";
import { addMovement } from "./movementBots";
import { restartBotLife, restartBotPosition} from "./restartGame";
import { addKeyBoardListeners, bots, removeKeyBoardListeners } from "./utilities";

const leftBotHTML = document.getElementById('bot-left');
const rightBotHTML = document.getElementById('bot-right');
const botsInArena = [];
export let colisionCount = 0;

const getRandomBot = () => {
    const randomIndexes = [];
    while(randomIndexes.length < 2){
        const randomIndex = Math.floor(Math.random()*bots.length);

        if(!randomIndexes.includes(randomIndex)){
            randomIndexes.push(randomIndex);
        }
    }

    return randomIndexes.map(index=>bots[index]);
}

const [botLeftOBJ,botRightOBJ] = getRandomBot();

const getBotLife = () => {
    const highBotLifeProbability = 0.6;

    if(Math.random() < highBotLifeProbability){
        return Math.max(Math.floor(Math.random() * 10) + 11, 0);
    } 
    return Math.max(Math.floor(Math.random() * 21),0);
}


export const botSets = [
    {   
        id: botLeftOBJ.id,
        class : 'bot-left',
        image: botLeftOBJ.image,
        translateX: 0,
        translateY: 0,
        speed: 15,
        life: getBotLife(),
        positions : {
            maxArenaX: 582,

            minArenaX: 0,
            maxArenaY: 235,
            minArenaY: -235,

        },
    },
    {   
        id: botRightOBJ.id,
        class : 'bot-right',
        image: botRightOBJ.image,
        translateX: 455,
        translateY: 0,
        speed: 15,

        life:  getBotLife(),

        positions : {
            maxArenaX: 455,
            minArenaX: -120,
            maxArenaY: 235,
            minArenaY: -235,
        },
    },
];



const createBotsInArena = () => {
    botsInArena.length = 0;
    const [botLeftOBJ, botRightOBJ] = getRandomBot();

    for (const botSet of botSets) {
        if (botSet.class === 'bot-left') {
            botSet.id = botLeftOBJ.id;
            botSet.image = botLeftOBJ.image;
            botsInArena.push(botSet.id);

            const leftBotImg = `
                <img src="./assets/robots/${botSet.image}" alt="Robô '${botSet.id}' em formato pixelizado"
                class="img-fluid">
            `;
            leftBotHTML.innerHTML = leftBotImg;
        } else if (botSet.class === 'bot-right') {
            botSet.id = botRightOBJ.id;
            botSet.image = botRightOBJ.image;
            botsInArena.push(botSet.id);

            const rightBotImg = `
                <img src="./assets/robots/${botSet.image}" alt="Robô '${botSet.id}' em formato pixelizado"
                class="img-fluid">
            `;
            rightBotHTML.innerHTML = rightBotImg;
        }
    }
}


const updatePositions = () => {
    for (const botSet of botSets) {

        if(botSet.class === 'bot-left'){
            leftBotHTML.style.transform = `translate(${botSet.translateX}px, ${botSet.translateY}px)`;
        } else if(botSet.class==='bot-right'){
            rightBotHTML.style.transform = `translate(${botSet.translateX}px, ${botSet.translateY}px)`;
        }
    }
}
// ====================================== Game ======================================

const verifyHitCounter = (colisionCount) => {
    return colisionCount >= 5;// lambda expression for (if collisionCount>=5) {return true}
}


const verifyEndGame = () => {

    if (verifyHitCounter(colisionCount)) {
        removeKeyBoardListeners();
        const [bot1,bot2] = botSets;
        getWinner(bot1,bot2);

        const restartBtn = document.getElementById('restart-btn');
        restartBtn.classList.toggle('game-restarted');

    }
}


export function gameManager(evt) { 

    
    for (const botSet of botSets) {
        addMovement(evt, botSet)

        if(colision(botSet, botSets)){
            handleCollision();
            
        };
    }

    verifyEndGame();
    updatePositions();

}

function restartGame () {


    for(const botSet of botSets) {
        restartBotLife(botSet);
    }

    const winnerBox = document.querySelector('.winner__box');
    winnerBox.classList.toggle('is-visible');
    restartBotPosition();
    colisionCount = 0;

    updateColisionCounter(colisionCount);
    addExclamationPointerToColisionBox(colisionCount);
    //sort the bots randonly again when the game restart
    createBotsInArena();


        
}

const getWinner = (...bots) => {
    const winnerBox = document.querySelector('.winner__box');
    const winnerBoxFigure = document.querySelector('.winner__figure');
    const winnerBoxSpan = document.getElementById('winner__name');

    winnerBoxFigure.innerHTML = '';


    //Decstructure function for get the two bots
    const [bot1, bot2] = bots;

    if (bot1.life > bot2.life) {
        winnerBox.classList.toggle('is-visible');
        winnerBoxFigure.innerHTML = `
            <img src="./assets/robots/${bot1.image}" alt="${bot1.id} - pixelizado" class="img__winner">
        `;
        const winnerBoxText = `${bot1.id} Venceu!`;
        winnerBoxSpan.innerHTML = winnerBoxText;
    } else {

        winnerBox.classList.toggle('is-visible');
        winnerBoxFigure.innerHTML = `
            <img src="./assets/robots/${bot2.image}" alt="${bot2.id} - pixelizado" 
            class="img__winner">
        `;
        const winnerBoxText = `${bot2.id} Venceu!`;
        winnerBoxSpan.innerHTML = winnerBoxText;
    }
}


function handleCollision() {
    colisionCount++;
    updateColisionCounter(colisionCount);
    addExclamationPointerToColisionBox(colisionCount);
    addSplashEffectOnDamageToColisionBox();
  }

export const gameLoop = () => {

    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click',(evt) => {
        startBtn.classList.add('game-started');
        leftBotHTML.classList.add('is-visible');
        rightBotHTML.classList.add('is-visible');
        
        addVisibilityToPontuation();
        gameManager(evt);
        addKeyBoardListeners();
 
        for(const botSet of botSets) {
            updateBotLife(botSet);
        }
    });

    const restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click',(evt) => {
        restartGame();
        restartBtn.classList.toggle('game-restarted'); 
        gameManager(evt);
        addKeyBoardListeners();
        for(const botSet of botSets) {
            updateBotLife(botSet);
        }
  
    
    });

    createBotsInArena();

}