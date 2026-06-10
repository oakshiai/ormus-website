import {drawRectangle} from './drawRectangle.js';
import {drawString} from './drawString.js';
import {move} from './move.js';
import {COLORS} from './colors.js';

const drawPromptText = (surface, prompt, highlightLength) => {
  if (!prompt) {
    return;
  }

  if (highlightLength > 0) {
    drawString(surface, prompt.slice(0, highlightLength), {color: COLORS.primary});
    drawString(surface, prompt.slice(highlightLength), {color: COLORS.subtle});
    return;
  }

  drawString(surface, prompt, {color: COLORS.text});
};

const drawPrompt = (surface, prompt, model, mode, {highlightLength = 0} = {}) => {
  drawRectangle(surface, {x: 0, y: 0}, {width: surface.width, height: 3}, COLORS.frame);
  move(surface, {x: 2, y: 1});
  drawString(surface, '❯', {color: COLORS.primaryMuted});
  move(surface, {deltaX: 1});
  drawPromptText(surface, prompt, highlightLength);
  move(surface, {x: surface.width - 3, y: 2});
  drawString(surface, ` ${mode} `, {anchor: 'right', color: COLORS.subtle});
  drawString(surface, '·', {anchor: 'right', color: COLORS.muted});
  drawString(surface, ` ${model} `, {anchor: 'right', color: COLORS.secondaryMuted});
};

export {drawPrompt};
