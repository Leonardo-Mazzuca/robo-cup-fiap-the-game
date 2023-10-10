import { updateBotLife } from "./colision";
import { botSets } from "./game";

export const showBotsLife = () => {
    const pontuation = document.getElementById('pontuation');
    
    for (const botSet of botSets) {
        const span = document.createElement('span');
        span.id = `life-${botSet.class}`;
        span.classList.add('pontuation__total');
        pontuation.appendChild(span);
        updateBotLife(botSet);
    }
}



