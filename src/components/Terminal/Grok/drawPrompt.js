import {drawRectangle} from './drawRectangle.js';
import {drawString} from './drawString.js';
import {move} from './move.js';

const drawPrompt = (surface, prompt, model, mode) => {
  drawRectangle(surface, {x: 0, y: 0}, {width: surface.width, height: 3}, '#323237');
  move(surface, {x: 2, y: 1});
  drawString(surface, '❯', {color: '#414141'});
  move(surface, {deltaX: 1});
  if (prompt) {
    drawString(surface, prompt, {color: '#4E4E4E'});
  }
  move(surface, {x: surface.width - 3, y: 2});
  drawString(surface, ` ${mode} `, {anchor: 'right', color: '#404040'});
  drawString(surface, '·', {anchor: 'right', color: '#3D3D3D'});
  drawString(surface, ` ${model} `, {anchor: 'right', color: '#5C5C5C'});
};

export {drawPrompt};
