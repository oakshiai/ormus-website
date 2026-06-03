import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';

import {TERMINAL_COLUMNS, TERMINAL_ROWS} from '../constants.js';

import {renderCanvasToRows} from '../../canvas.js';
import {drawInterface} from '../../drawInterface.js';

test('matches the launch fixture', () => {
  const canvas = drawInterface({
    width: TERMINAL_COLUMNS,
    height: TERMINAL_ROWS,
    branch: 'trunk',
    cwd: '~/Projects/grok/website/',
    model: 'Grok Build',
    mode: 'always-approve',
    release: {
      version: '0.2.20',
      channel: 'stable',
      label: 'Beta',
    },
    thread: [],
    tip: 'Use @ to attach files like @src/main.rs.'
  });

  const expected = fs.readFileSync(new URL('./launch.txt', import.meta.url), 'utf8');
  const expectedLines = expected.split('\n');
  const renderedLines = renderCanvasToRows(canvas);

  for (let i = 0; i < expectedLines.length; i += 1) {
    assert.equal(renderedLines[i].trimEnd(), expectedLines[i], `${i}`);
  }
});
