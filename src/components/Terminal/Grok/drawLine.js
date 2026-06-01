import {drawCharacter} from './drawCharacter.js';

const drawLine = (canvas, from, to, color) => {
  const deltaX = Math.abs(to.x - from.x);
  const deltaY = -Math.abs(to.y - from.y);
  const stepX = from.x < to.x ? 1 : -1;
  const stepY = from.y < to.y ? 1 : -1;
  const character = from.x === to.x ? '│' : '─';

  let error = deltaX + deltaY;
  let x = from.x;
  let y = from.y;

  while (true) {
    drawCharacter(canvas, x, y, character, color);

    if (x === to.x && y === to.y) {
      break;
    }

    const doubleError = error * 2;

    if (doubleError >= deltaY) {
      error += deltaY;
      x += stepX;
    }

    if (doubleError <= deltaX) {
      error += deltaX;
      y += stepY;
    }
  }
};

export {drawLine};