import {drawCharacter} from './drawCharacter.js';

const drawString = (canvas, from, string, color) => {
  const startX = Math.min(Math.max(from.x, 0), canvas.width);

  let x = from.x;
  let y = from.y;

  for (const character of string) {
    if (character === '\n') {
      x = startX;
      y += 1;
      continue;
    }

    if (x >= canvas.width) {
      x = startX;
      y += 1;
    }

    drawCharacter(canvas, x, y, character, color);
    x += 1;
  }
};

export {drawString};