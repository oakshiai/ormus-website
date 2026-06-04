import assert from 'node:assert/strict';
import test, {suite} from 'node:test';
import fs from 'node:fs';

import {renderCanvasToRows} from '../../canvas.js';
import {drawInterface} from '../../drawInterface.js';

const session = JSON.parse(fs.readFileSync(new URL('./session.json', import.meta.url), 'utf8'));

const baseOptions = {
  width: session.size.columns,
  height: session.size.rows,
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
    tip: 'Use Ctrl+Enter to interject messages. Or just Enter to queue messages.'
  },
  '0002-changelog.txt': {
    release,
    tip: 'Use Ctrl+Enter to interject messages. Or just Enter to queue messages.',
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
  '0004-entering-prompt.txt': {
    cwd: '~/Projects/grok/recorder',
    prompt: 'tes',
    suggestedShortcuts: sendShortcuts
  },
  '0005-entering-prompt.txt': {
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
    assert.equal(renderedLines[i], expectedLines[i], `${i}`);
  }
};

const getExpectedColor = (colors, x, y) => {
  const run = colors.runs.find(({column, length, row}) => {
    return row === y && x >= column && x < column + length;
  });

  return run?.foreground;
};

const assertColorsMatchFixture = (canvas, fixtureFile) => {
  const expected = JSON.parse(fs.readFileSync(new URL(`./${fixtureFile.replace('.txt', '.json')}`, import.meta.url), 'utf8'));

  canvas.cells.forEach((cell, index) => {
    if (cell.contents === ' ') {
      return;
    }

    const x = index % canvas.width;
    const y = Math.floor(index / canvas.width);
    const actualColor = cell.color?.toLowerCase();
    const expectedColor = getExpectedColor(expected.colors, x, y);

    assert.equal(actualColor, expectedColor, `${fixtureFile}:${y}:${x}`);
  });
};

suite('menu-navigation-and-session-start-mobile', () => {
  for (const chapter of session.chapters) {
    test(chapter.title, () => {
      const canvas = drawInterface({
        ...baseOptions,
        ...chapterOptions[chapter.file],
        chapter
      });

      assertMatchesFixture(canvas, chapter.file);
      assertColorsMatchFixture(canvas, chapter.file);
    });
  }
});
