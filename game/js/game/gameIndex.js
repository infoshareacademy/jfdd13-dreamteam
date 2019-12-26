import {boardButtons, backToMenu, game} from './game'

export const gameIndex = () => {
boardButtons[1].addEventListener("click", game);
boardButtons[0].addEventListener("click", backToMenu);
}