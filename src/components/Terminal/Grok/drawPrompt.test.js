import assert from 'node:assert/strict';
import {test} from 'node:test';

import {createCanvas, renderCanvasToRows} from './canvas.js';
import {drawPrompt} from './drawPrompt.js';

test('drawPrompt draws the prompt and footer labels', () => {
  const canvas = createCanvas(36, 8);

  drawPrompt(canvas, 'Build the terminal UI', 'Grok Build', 'always-approve');

  assert.deepEqual(renderCanvasToRows(canvas), [
    '                                    ',
    '                                    ',
    '  ╭──────────────────────────────╮  ',
    '  │ ❯ Build the terminal UI      │  ',
    '  ╰ Grok Build · always-approve ─╯  ',
    '                                    ',
    '                                    ',
    '                                    ',
  ]);
});
