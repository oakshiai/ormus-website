import assert from 'node:assert/strict';
import test, {suite} from 'node:test';
import fs from 'node:fs';

import {TERMINAL_COLUMNS, TERMINAL_ROWS} from '../constants.js';

import {renderCanvasToRows} from '../../canvas.js';
import {drawInterface} from '../../drawInterface.js';

const session = JSON.parse(fs.readFileSync(new URL('./session.json', import.meta.url), 'utf8'));

const baseOptions = {
  width: TERMINAL_COLUMNS,
  height: TERMINAL_ROWS,
  branch: 'trunk',
  cwd: '~/Projects/grok/recorder/',
  model: 'Grok Build',
  mode: 'always-approve',
  thread: []
};

const release = {
  version: '0.2.22',
  channel: 'stable',
  label: 'Beta'
};

const sendShortcuts = [
  {keys: 'Enter', effect: 'send'},
  {keys: 'Shift+Tab', effect: 'mode'},
  {keys: 'Ctrl+.', effect: 'shortcuts'}
];

const chapterOptions = {
  '0001-main-menu.txt': {
    release,
    tip: 'Press Ctrl+O to toggle auto-approve mode.'
  },
  '0002-changelog.txt': {
    release,
    tip: 'Press Ctrl+O to toggle auto-approve mode.',
    changelog: {
      title: 'Changelog',
      action: {
        label: 'See all',
        keys: 'ctrl-l'
      },
      items: [
        'Authentication errors with static API keys now surface a clear error instead of hanging the turn.',
        'allowed_models in config.toml now restricts which models appear in the picker and /model command.',
        'Code navigation now returns correct results for secondary project windows with different working directories.'
      ]
    }
  },
  '0003-starting-session.txt': {
    cwd: '~/Projects/grok/recorder',
    prompt: 't',
    suggestedShortcuts: sendShortcuts,
    indicator: {
      text: 'Starting session…',
      elapsed: '0.0s'
    }
  },
  '0004-message-input.txt': {
    cwd: '~/Projects/grok/recorder',
    prompt: 'test',
    suggestedShortcuts: sendShortcuts
  },
  '0005-message-input-with-quit-hint.txt': {
    context: {
      used: '4.6K',
      remaining: '512K'
    },
    prompt: 'test',
    suggestedShortcuts: [
      {keys: 'Ctrl+d', effect: 'press again to quit'}
    ]
  }
};

const assertMatchesFixture = (canvas, fixtureFile) => {
  const expected = fs.readFileSync(new URL(`./${fixtureFile}`, import.meta.url), 'utf8');
  const expectedLines = expected.split('\n');
  const renderedLines = renderCanvasToRows(canvas);

  for (let i = 0; i < expectedLines.length; i += 1) {
    assert.equal(renderedLines[i].trimEnd(), expectedLines[i], `${i}`);
  }
};

suite('menu-navigation-and-session-start', () => {
  for (const chapter of session.chapters) {
    test(chapter.title, () => {
      const canvas = drawInterface({
        ...baseOptions,
        ...chapterOptions[chapter.file],
        chapter
      });

      assertMatchesFixture(canvas, chapter.file);
    });
  }
});
