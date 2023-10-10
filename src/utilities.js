import { gameManager } from "./game";

export const bots = [

    {
        id: 'bot-of-war',
        image: 'botOfWarPixel.png',
    },
    {
        id: 'T-Spider',
        image: 'ant-droid.png',
    },
    {
        id: 'apple-robot',
        image: 'apple-robot.png',
    },
    {
        id: 'Cleitin',
        image: 'cleitin.png',
    },
    {
        id: 'Wither',
        image: 'wither.png',
    },
    {
        id: 'The Warden',
        image: 'warden.png',
    },
    {
        id: 'Scarlet',
        image: 'project-scarlet.png',
    },
    {
        id: 'TrollFace',
        image: 'trollface.png',
    },
    {
        id: 'R2-D2',
        image: 'r2d2.png',
    },

];


export function addKeyBoardListeners() {
    document.addEventListener('keydown', gameManager);
}

export function removeKeyBoardListeners() {
    document.removeEventListener('keydown', gameManager);
}

