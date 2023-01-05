import _ from 'lodash';
import { renderDefault } from './DOM/default';
import { renderStart } from './DOM/start';
import { renderPlacing } from './DOM/placing';
import { renderGame } from './DOM/game';

export const data = {
  "nickname": "Cherartem",
  "ships": {
    "carrier-5": null,
    "battleship-4": null,
    "cruiser-3": null,
    "submarine-3": null,
    "destroyer-2": null
  }
};

renderDefault();
renderPlacing();
