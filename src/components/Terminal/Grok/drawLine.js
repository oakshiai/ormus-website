import {drawCharacter} from './drawCharacter.js';

const drawLine = (surface, end, {color} = {}) => {
  const deltaX = end.x !== undefined ? Math.abs(end.x - surface.cursor.x) : 0;
  const deltaY = end.y !== undefined ? Math.abs(end.y - surface.cursor.y) : 0;
  const character = deltaX > 0 ? '─' : '│';
  const start = (
    deltaX > 0 ?
    Math.min(surface.cursor.x, end.x) :
    Math.min(surface.cursor.y, end.y)
  );
  const length = deltaX > 0 ? deltaX : deltaY;

  for (let i = start; i <= (start + length); i += 1) {
    if (deltaX > 0) {
      drawCharacter(surface, i, surface.cursor.y, character, color);
    } else {
      drawCharacter(surface, surface.cursor.x, i, character, color);
    }
  }

  if (deltaX > 0) {
    surface.cursor.x = end.x > surface.cursor.x ? end.x + 1 : end.x - 1;
  } else if (deltaY > 0) {
    surface.cursor.y = end.y > surface.cursor.y ? end.y + 1 : end.y - 1;
  }
};

export {drawLine};
