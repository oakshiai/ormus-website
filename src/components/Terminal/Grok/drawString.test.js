import assert from 'node:assert/strict';
import {test} from 'node:test';

import {createCanvas, renderCanvasToRows} from './canvas.js';
import {move} from './move.js';
import {drawString} from './drawString.js';

test('drawString at cursor', () => {
  const canvas = createCanvas(10, 4);

  drawString(canvas, 'testing');

  assert.deepEqual(renderCanvasToRows(canvas), [
    'testing   ',
    '          ',
    '          ',
    '          ',
  ]);
});
test('drawString at position x', () => {
  const canvas = createCanvas(10, 4);

  move(canvas, {x: 2});
  drawString(canvas, 'testing');

  assert.deepEqual(renderCanvasToRows(canvas), [
    '  testing ',
    '          ',
    '          ',
    '          ',
  ]);
});
test('drawString at position y', () => {
  const canvas = createCanvas(10, 4);

  move(canvas, {y: 2});
  drawString(canvas, 'testing');

  assert.deepEqual(renderCanvasToRows(canvas), [
    '          ',
    '          ',
    'testing   ',
    '          ',
  ]);
});
test('drawString at position x with anchor = right', () => {
  const canvas = createCanvas(10, 4);

  move(canvas, {x: canvas.width - 1});
  drawString(canvas, 'testing', {anchor: 'right'});

  assert.deepEqual(renderCanvasToRows(canvas), [
    '   testing',
    '          ',
    '          ',
    '          ',
  ]);
});
