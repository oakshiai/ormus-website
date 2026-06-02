import {drawRectangle} from './drawRectangle.js';
import {drawString} from './drawString.js';

const HORIZONTAL_PADDING = 2;

const drawPrompt = (canvas, prompt, model, mode) => {
  const promptText = String(prompt);
  const modelText = ` ${model} `;
  const separatorText = '·';
  const modeText = ` ${mode} `;
  const footerLength = modelText.length + separatorText.length + modeText.length;
  const width = canvas.width - HORIZONTAL_PADDING*2;
  const height = 3;
  const x = HORIZONTAL_PADDING;
  const y = canvas.height - height - 3;
  const footerX = x + width - footerLength - 2;
  const footerY = y + height - 1;

  drawRectangle(canvas, {x, y}, {width, height}, '#323237');
  drawString(canvas, {x: x + 2, y: y + 1}, '❯', '#414141');
  drawString(canvas, {x: x + 4, y: y + 1}, promptText, '#4E4E4E');
  drawString(canvas, {x: footerX, y: footerY}, modelText, '#5C5C5C');
  drawString(canvas, {x: footerX + modelText.length, y: footerY}, separatorText, '#3D3D3D');
  drawString(canvas, {x: footerX + modelText.length + separatorText.length, y: footerY}, modeText, '#404040');

  return {
    x,
    y,
    width,
    height
  };
};

export {drawPrompt};
