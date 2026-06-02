import {drawCharacter} from './drawCharacter.js';

const drawString = (surface, from, string, color) => {
  let x = from.x;
  let y = from.y;

  for (const character of string) {
    if (character === '\n') {
      x = from.x;
      y += 1;
      continue;
    }

    drawCharacter(surface, x, y, character, color);
    x += 1;
  }
};

export {drawString};
