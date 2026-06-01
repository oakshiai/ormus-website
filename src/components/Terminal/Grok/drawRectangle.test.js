import assert from 'node:assert/strict';
import {test} from 'node:test';

import {createCanvas, renderCanvasToRows} from './canvas.js';
import {drawRectangle} from './drawRectangle.js';

const getCell = (canvas, x, y) => {
  return canvas.cells[(canvas.width * y) + x];
};

test('drawRectangle draws a bordered rectangle with rounded corners', () => {
  const canvas = createCanvas(7, 4);

  drawRectangle(canvas, {x: 0, y: 0}, {width: canvas.width - 1, height: canvas.height - 1}, 'green');

  assert.deepEqual(renderCanvasToRows(canvas), [
    '╭────╮ ',
    '│    │ ',
    '╰────╯ ',
    '       ',
  ]);
});

test('drawRectangle draws a minimal sized rectangle', () => {
  const canvas = createCanvas(4, 4);

  drawRectangle(canvas, {x: 0, y: 0}, {width: 2, height: 2}, 'green');

  assert.deepEqual(renderCanvasToRows(canvas), [
    '╭╮  ',
    '╰╯  ',
    '    ',
    '    ',
  ]);
});

test('drawRectangle draws a minimal sized rectangle with space inside', () => {
  const canvas = createCanvas(4, 4);

  drawRectangle(canvas, {x: 0, y: 0}, {width: 3, height: 3}, 'green');

  assert.deepEqual(renderCanvasToRows(canvas), [
    '╭─╮ ',
    '│ │ ',
    '╰─╯ ',
    '    ',
  ]);
});

test('drawRectangle colors only the rectangle border', () => {
  const canvas = createCanvas(7, 6);

  drawRectangle(canvas, {x: 1, y: 1}, {width: 4, height: 3}, 'green');

  const borderCoordinates = new Set([
    '1,1',
    '2,1',
    '3,1',
    '4,1',
    '1,2',
    '4,2',
    '1,3',
    '2,3',
    '3,3',
    '4,3',
  ]);

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const cell = getCell(canvas, x, y);
      const coordinate = `${x},${y}`;

      assert.equal(cell.color, borderCoordinates.has(coordinate) ? 'green' : undefined);
    }
  }
});
