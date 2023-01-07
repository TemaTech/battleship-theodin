import _ from 'lodash';
import { renderDefault } from './DOM/default';
import { renderStart } from './DOM/start';
import { renderPlacing } from './DOM/placing';
import { renderGame } from './DOM/game';
import { renderFinalScreen } from './DOM/finalScreen';
import { Game } from './scripts/game';

export const data = {
  "nickname": 'Cherartem',
  "ships": {
    "carrier-5": '0-0-X',
    "battleship-4": '2-0-X',
    "cruiser-3": '0-9-Y',
    "submarine-3": '7-9-Y',
    "destroyer-2": '8-4-X'
  }
};

renderDefault();
renderGame();
