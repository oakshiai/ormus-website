import {drawCharacter} from './drawCharacter.js';

const drawLine = (surface, end, {color} = {}) => {
  const deltaX = end.x ? Math.abs(end.x - surface.cursor.x) : 0;
  const deltaY = end.y ? Math.abs(end.y - surface.cursor.y) : 0;
  const character = deltaX > 0 ? '─' : '│';
  const start = deltaX > 0 ? surface.cursor.x : surface.cursor.y;
  const length = deltaX > 0 ? deltaX : deltaY;

  for (let i = start; i <= (start + length); i += 1) {
    if (deltaX > 0) {
      drawCharacter(surface, i, surface.cursor.y, character, color);
    } else {
      drawCharacter(surface, surface.cursor.x, i, character, color);
    }
  }

  if (deltaX > 0) {
    surface.cursor.x = start + length + 1;
  } else {
    surface.cursor.y = start + length + 1;
  }
};

export {drawLine};