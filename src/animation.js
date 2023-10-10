export const addVisibilityToPontuation = () => {
    const pontuationTotal = document.querySelectorAll('.pontuation__total');
    
    if(pontuationTotal){

        pontuationTotal.forEach(pontuation => {
            pontuation.classList.toggle('is-visible');
        });
        
    }
}

export const addSplashEffectOnDamageToColisionBox = () => {
    const colisionAnimation = document.querySelector('.animation-wrapper');
    colisionAnimation.style.opacity = '1';
    setTimeout(()=>{
        colisionAnimation.style.opacity = '0';
    },500)
}

export const addExclamationPointerToColisionBox = (colisionCount) => {
    const exclamationPoint = document.querySelector('.exclamation__icon');
    const faExclamation = document.querySelector('.fa-exclamation')

    if (colisionCount === 3 || colisionCount === 4) {
        exclamationPoint.classList.add('is-visible');
        if(colisionCount === 3){
            faExclamation.style.animationDuration = '.3s';
            exclamationPoint.style.opacity = 0.5;
        } else if( colisionCount === 4){
            faExclamation.style.animationDuration = '.1s';
            exclamationPoint.style.opacity = 1;
        }
    } else {
        exclamationPoint.classList.remove('is-visible');
        exclamationPoint.style.opacity = 0;
    }
};
