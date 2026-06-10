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
  cwd: '~/Projects/grok/playground/webgpu',
  model: 'Grok Build',
  mode: 'always-approve',
  thread: []
};

const sendShortcuts = [
  {keys: 'Enter', effect: 'send'},
  {keys: 'Shift+Tab', effect: 'mode'},
  {keys: 'Ctrl+.', effect: 'shortcuts'}
];

const commandSuggestions = [
  {command: '/quit', description: 'Quit the application', selected: true, scrollbar: true},
  {command: '/home', description: 'Return to the welcome screen'},
  {command: '/new', description: 'Start a new session'},
  {command: '/fork', description: 'Branch the current session into a peer agent'},
  {command: '/compact', description: 'Compact conversation history'},
  {command: '/copy', description: 'Copy last response to clipboard (/copy N for Nth-latest)'}
];

const essentialsItems = [
  {label: 'Send', keys: 'Enter'},
  {label: 'Focus prompt', keys: 'Tab / i / Space'},
  {label: 'Focus scrollback', keys: 'Esc / Tab'},
  {label: 'Cancel turn', keys: 'Ctrl+c'},
  {label: 'Cycle mode (Normal / Plan / Auto-approve)', keys: 'Shift+Tab'},
  {label: 'Quit', keys: 'Ctrl+q / Ctrl+d'},
  {label: 'Command palette', keys: 'Ctrl+p / ?'},
  {label: 'Keyboard shortcuts', keys: 'Ctrl+. / Ctrl+x'},
  {label: 'Open the settings modal', keys: 'F2 / Ctrl+, / ,'}
];

const inputItems = [
  {label: 'Interject while running', keys: 'Ctrl+Enter / Ctrl+i'},
  {label: 'Search prompt history', keys: 'Ctrl+r'},
  {label: 'Toggle multiline', keys: 'Ctrl+m'},
  {label: 'Shell mode (type ! on empty prompt)', keys: '!'}
];

const chapterOptions = {
  'screen-000003.txt': {
    context: {
      used: '4.6K',
      remaining: '512K'
    },
    prompt: '/',
    promptHighlightLength: 1,
    suggestedShortcuts: sendShortcuts,
    suggestions: {
      count: 53,
      items: commandSuggestions
    },
    shortcuts: {
      sections: [
        {title: 'Essentials', expanded: true, items: essentialsItems},
        {title: 'Input', expanded: false, count: 4},
        {title: 'Conversation Navigation', expanded: false, count: 14},
        {title: 'Conversation Actions', expanded: false, count: 11},
        {title: 'Panels', expanded: false, count: 6},
        {title: 'Session', expanded: false, count: 3}
      ]
    }
  },
  'screen-000004.txt': {
    context: {
      used: '4.6K',
      remaining: '512K'
    },
    prompt: '/',
    promptHighlightLength: 1,
    suggestedShortcuts: sendShortcuts,
    suggestions: {
      count: 53,
      items: commandSuggestions
    },
    shortcuts: {
      sections: [
        {title: 'Essentials', expanded: true, items: essentialsItems},
        {title: 'Input', expanded: true, items: inputItems},
        {title: 'Conversation Navigation', expanded: false, count: 14},
        {title: 'Conversation Actions', expanded: false, count: 11},
        {title: 'Panels', expanded: false, count: 6},
        {title: 'Session', expanded: false, count: 3}
      ]
    }
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

suite('shortcuts', () => {
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
