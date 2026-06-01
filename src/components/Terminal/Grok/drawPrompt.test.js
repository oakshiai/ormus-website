import assert from 'node:assert/strict';
import {test} from 'node:test';

import {createCanvas} from './createCanvas.js';
import {drawPrompt} from './drawPrompt.js';

const renderCanvas = (canvas) => {
  const rows = [];

  for (let y = 0; y < canvas.height; y += 1) {
    const start = y * canvas.width;
    const end = start + canvas.width;

    rows.push(canvas.cells.slice(start, end).map((cell) => cell.contents).join(''));
  }

  return rows;
};

test('drawPrompt draws the prompt and footer labels', () => {
  const canvas = createCanvas(36, 8);

  drawPrompt(canvas, 'Build the terminal UI', 'Grok Build', 'always-approve');

  assert.deepEqual(renderCanvas(canvas), [
    '                                    ',
    '                                    ',
    ' ╭────────────────────────────────╮ ',
    ' │ ❯ Build the terminal UI        │ ',
    ' ╰── Grok Build · always-approve ─╯ ',
    '                                    ',
    '                                    ',
    '                                    ',
  ]);
});
