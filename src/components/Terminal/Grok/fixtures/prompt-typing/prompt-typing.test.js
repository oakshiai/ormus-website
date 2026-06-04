import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';

import {TERMINAL_COLUMNS, TERMINAL_ROWS} from '../constants.js';

import {renderCanvasToRows} from '../../canvas.js';
import {drawInterface} from '../../drawInterface.js';

test('matches the prompt-typing fixture', () => {
  const canvas = drawInterface({
    width: TERMINAL_COLUMNS,
    height: TERMINAL_ROWS,
    branch: 'trunk',
    cwd: '~/Projects/grok/website/',
    context: {
      used: '4.6K',
      remaining: '512K'
    },
    thread: [],
    prompt: 'Test',
    model: 'Grok Build',
    mode: 'always-approve',
    suggestedShortcuts: [
      {keys: 'Enter', effect: 'send'},
      {keys: 'Shift+Tab', effect: 'mode'},
      {keys: 'Ctrl+.', effect: 'shortcuts'},
    ]
  });

  const expected = fs.readFileSync(new URL('./prompt-typing.txt', import.meta.url), 'utf8');
  const expectedLines = expected.split('\n');
  const renderedLines = renderCanvasToRows(canvas);

  for (let i = 0; i < expectedLines.length; i += 1) {
    assert.equal(renderedLines[i].trimEnd(), expectedLines[i], `${i}`);
  }
});
