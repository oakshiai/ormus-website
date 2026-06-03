import assert from 'node:assert/strict';
import {test} from 'node:test';

import {createCanvas, renderCanvasToRows} from './canvas.js';
import {drawLine} from './drawLine.js';
import {moveTo} from './moveTo.js';

test('drawLine draws a horizontal line from the cursor to the right', () => {
  const canvas = createCanvas(6, 3);

  moveTo(canvas, {x: 1, y: 1});
  drawLine(canvas, {x: 4});

  assert.deepEqual(renderCanvasToRows(canvas), [
    '      ',
    ' ──── ',
    '      ',
  ]);
  assert.deepEqual(canvas.cursor, {x: 5, y: 1});
});

test('drawLine draws a horizontal line from the cursor to the left', () => {
  const canvas = createCanvas(6, 3);

  moveTo(canvas, {x: 4, y: 1});
  drawLine(canvas, {x: 1});

  assert.deepEqual(renderCanvasToRows(canvas), [
    '      ',
    ' ──── ',
    '      ',
  ]);
  assert.deepEqual(canvas.cursor, {x: 5, y: 1});
});

test('drawLine draws a vertical line from the cursor down', () => {
  const canvas = createCanvas(4, 5);

  moveTo(canvas, {x: 2, y: 1});
  drawLine(canvas, {y: 3});

  assert.deepEqual(renderCanvasToRows(canvas), [
    '    ',
    '  │ ',
    '  │ ',
    '  │ ',
    '    ',
  ]);
  assert.deepEqual(canvas.cursor, {x: 2, y: 4});
});

test('drawLine draws a vertical line from the cursor up', () => {
  const canvas = createCanvas(4, 5);

  moveTo(canvas, {x: 2, y: 3});
  drawLine(canvas, {y: 1});

  assert.deepEqual(renderCanvasToRows(canvas), [
    '    ',
    '  │ ',
    '  │ ',
    '  │ ',
    '    ',
  ]);
  assert.deepEqual(canvas.cursor, {x: 2, y: 4});
});