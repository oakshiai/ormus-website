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

const modeShortcuts = [
  {keys: 'Shift+Tab', effect: 'mode'},
  {keys: 'Ctrl+.', effect: 'shortcuts'}
];

const context = {
  used: '4.6K',
  remaining: '512K'
};

const usageReport = [
  'Credits used: 0%',
  'Resets: Jun 30, 16:00 PT',
  '',
  'Pay as you go: disabled'
];

const commandSuggestions = [
  {command: '/quit', description: 'Quit the application', selected: true, scrollbar: true},
  {command: '/home', description: 'Return to the welcome screen'},
  {command: '/new', description: 'Start a new session'},
  {command: '/fork', description: 'Branch the current session into a peer agent'},
  {command: '/compact', description: 'Compact conversation history'},
  {command: '/copy', description: 'Copy last response to clipboard (/copy N for Nth-latest)'}
];

const usageSuggestions = [
  {command: '/usage', description: 'View credit usage or manage billing', selected: true, scrollbar: true, highlightIndexes: [1]},
  {command: '/import-claude', description: 'Open the Claude settings import modal', scrollbar: true, highlightIndexes: [11]},
  {command: '/logout', description: 'Log out and return to the login screen', scrollbar: true, highlightIndexes: [5]},
  {command: '/multiline', description: 'Toggle multiline input mode (swap Enter and Shift+Enter)', scrollbar: true, highlightIndexes: [2]},
  {command: '/plugins', description: 'View plugins', highlightIndexes: [3]},
  {command: '/quit', description: 'Quit the application', highlightIndexes: [2]}
];

const shortUsageSuggestions = [
  {command: '/usage', description: 'View credit usage or manage billing', selected: true, highlightIndexes: [1, 2]},
  {command: '/plugins', description: 'View plugins', highlightIndexes: [3, 7]}
];

const usageSubcommands = [
  {command: 'show', description: 'View credit usage', selected: true},
  {command: 'manage', description: 'Open billing management page'}
];

const changelog = {
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
};

const chapterOptions = {
  '0001-main-menu.txt': {
    release,
    tip: 'Use Shift+Tab to cycle between modes, like Plan mode.'
  },
  '0002-changelog.txt': {
    release,
    tip: 'Use Shift+Tab to cycle between modes, like Plan mode.',
    changelog
  },
  '0003-slash-commands-list.txt': {
    cwd: '~/Projects/grok/recorder',
    prompt: '/',
    promptHighlightLength: 1,
    suggestedShortcuts: sendShortcuts,
    suggestions: {
      count: 40,
      items: commandSuggestions
    }
  },
  '0004-usage-command-selection.txt': {
    cwd: '~/Projects/grok/recorder',
    context,
    prompt: '/usage',
    promptHighlightLength: 2,
    suggestedShortcuts: sendShortcuts,
    suggestions: {
      count: 9,
      items: usageSuggestions
    }
  },
  '0005-usage-subcommands.txt': {
    cwd: '~/Projects/grok/recorder',
    context,
    prompt: '/usage',
    promptHighlightLength: 3,
    suggestedShortcuts: sendShortcuts,
    suggestions: {
      count: 2,
      descriptionColumn: 16,
      items: shortUsageSuggestions
    }
  },
  '0006-usage-report.txt': {
    cwd: '~/Projects/grok/recorder',
    context,
    prompt: '/usage',
    promptHighlightLength: 4,
    suggestedShortcuts: sendShortcuts,
    suggestions: {
      count: 1,
      descriptionColumn: 14,
      items: [
        {command: '/usage', description: 'View credit usage or manage billing', selected: true, highlightIndexes: [1, 2, 3]}
      ]
    }
  },
  '0007-quit-confirmation.txt': {
    cwd: '~/Projects/grok/recorder',
    context,
    prompt: '/usage show | manage',
    promptHighlightLength: 6,
    suggestedShortcuts: sendShortcuts,
    suggestions: {
      count: 2,
      descriptionColumn: 14,
      items: usageSubcommands
    }
  },
  '0008-chapter-8.txt': {
    cwd: '~/Projects/grok/recorder',
    context,
    suggestedShortcuts: modeShortcuts
  },
  '0009-chapter-9.txt': {
    cwd: '~/Projects/grok/recorder',
    context,
    body: usageReport,
    suggestedShortcuts: modeShortcuts
  },
  '0010-chapter-10.txt': {
    cwd: '~/Projects/grok/recorder',
    context,
    body: usageReport,
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

suite('menu-navigation-and-usage-check', () => {
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
