import { botSets } from "./game";


export function restartBotLife (botSet) {
    botSet.life = Math.max(Math.floor(Math.random() * 21), 0);
}

export function restartBotPosition () {
    for(const botSet of botSets){
        botSet.class === 'bot-left' ? (botSet.translateX = 0, botSet.translateY = 0) : (botSet.translateX = 455, botSet.translateY = 0); 
    }
}


