import {drawCharacter} from './drawCharacter.js';
import {drawLine} from './drawLine.js';

const drawRectangle = (canvas, origin, size, color) => {
  const left = origin.x;
  const top = origin.y;
  const right = origin.x + size.width - 1;
  const bottom = origin.y + size.height - 1;

  drawLine(canvas, {x: left, y: top}, {x: right, y: top}, color);
  drawLine(canvas, {x: left, y: bottom}, {x: right, y: bottom}, color);
  drawLine(canvas, {x: left, y: top}, {x: left, y: bottom}, color);
  drawLine(canvas, {x: right, y: top}, {x: right, y: bottom}, color);

  drawCharacter(canvas, left, top, '╭', color);
  drawCharacter(canvas, right, top, '╮', color);
  drawCharacter(canvas, left, bottom, '╰', color);
  drawCharacter(canvas, right, bottom, '╯', color);
};

export {drawRectangle};
