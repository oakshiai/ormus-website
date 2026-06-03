import {drawCharacter} from './drawCharacter.js';

const drawString = (surface, string, {anchor = 'left', color} = {}) => {
  let x = (
    anchor === 'right' ?
    surface.cursor.x - string.length + 1 :
    surface.cursor.x
  );
  let y = surface.cursor.y;

  const initialX = x;

  for (const character of string) {
    if (character === '\n') {
      x = initialX;
      y += 1;
      continue;
    }

    drawCharacter(surface, x, y, character, color ?? surface.color);
    x += 1;
  }

  surface.cursor.x = anchor === 'right' ? surface.cursor.x - string.length : x;
  surface.cursor.y = y;
  surface.color = color;
};

export {drawString};
