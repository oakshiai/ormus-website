import {drawCharacter} from './drawCharacter.js';
import {move} from './move.js';
import {drawString} from './drawString.js';
import {COLORS} from './colors.js';

const drawModal = (surface, {left, top, width, height, title = 'Modal'}) => {
  const right = left + width - 1;
  const bottom = top + height - 1;

  // Clear the entire modal rect to ensure we overwrite any underlying content
  // (e.g. suggestion separators that cross the area, prompt frame parts in center).
  for (let y = top; y <= bottom; y += 1) {
    for (let x = left; x <= right; x += 1) {
      drawCharacter(surface, x, y, ' ', undefined);
    }
  }

  // Top border with corners (sharp box style to match fixtures)
  move(surface, {x: left, y: top});
  drawCharacter(surface, left, top, '┌', COLORS.muted);
  for (let x = left + 1; x < right; x += 1) {
    drawCharacter(surface, x, top, '─', COLORS.muted);
  }
  drawCharacter(surface, right, top, '┐', COLORS.muted);

  // Title on top row
  const titleText = ` ${title} `;
  move(surface, {x: left + 2, y: top});
  drawString(surface, titleText, {color: COLORS.text});

  // Close button near right of title bar, matching fixture exactly: " [✗] ─┐"
  const closeX = right - 6;
  move(surface, {x: closeX, y: top});
  drawString(surface, ' [✗] ─', {color: COLORS.muted});

  // Vertical sides (inner rows)
  for (let y = top + 1; y < bottom; y += 1) {
    drawCharacter(surface, left, y, '│', COLORS.muted);
    drawCharacter(surface, right, y, '│', COLORS.muted);
  }

  // Bottom border
  move(surface, {x: left, y: bottom});
  drawCharacter(surface, left, bottom, '└', COLORS.muted);
  for (let x = left + 1; x < right; x += 1) {
    drawCharacter(surface, x, bottom, '─', COLORS.muted);
  }
  drawCharacter(surface, right, bottom, '┘', COLORS.muted);
};

export {drawModal};
