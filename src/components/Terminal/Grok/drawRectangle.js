import {move} from './move.js';
import {drawCharacter} from './drawCharacter.js';
import {drawLine} from './drawLine.js';

const drawRectangle = (surface, origin, size, color) => {
  const left = origin.x;
  const top = origin.y;
  const right = origin.x + size.width - 1;
  const bottom = origin.y + size.height - 1;

  move(surface, {x: left, y: top});
  drawLine(surface, {x: right}, {color});
  move(surface, {deltaX: -1});
  drawLine(surface, {y: bottom}, {color});
  move(surface, {deltaY: -1});
  drawLine(surface, {x: left}, {color});
  move(surface, {deltaX: 1});
  drawLine(surface, {y: top}, {color});

  drawCharacter(surface, left, top, '╭', color);
  drawCharacter(surface, right, top, '╮', color);
  drawCharacter(surface, left, bottom, '╰', color);
  drawCharacter(surface, right, bottom, '╯', color);
};

export {drawRectangle};
