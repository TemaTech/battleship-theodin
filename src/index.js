import _ from 'lodash';
import { renderDefault } from './DOM/default';
import { renderStart } from './DOM/start';
import { renderPlacing } from './DOM/placing';

export const data = {
  "nickname": null,
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
