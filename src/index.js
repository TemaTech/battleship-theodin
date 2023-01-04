import _ from 'lodash';
import { renderDefault } from './DOM/default';
import { renderStart } from './DOM/start';
import { renderPlacing } from './DOM/placing';
import { renderGame } from './DOM/game';

export const data = {
  "nickname": "Cherartem",
  "ships": {
    "carrier-5": '0-0-X',
    "battleship-4": '2-0-Y',
    "cruiser-3": '4-2-Y',
    "submarine-3": '9-7-X',
    "destroyer-2": '8-3-X'
  }
};

renderDefault();
renderGame();
