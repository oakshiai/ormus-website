import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

import {createCanvas, renderCanvasToRows} from './canvas.js';
import {drawLine} from './drawLine.js';
import {drawRectangle} from './drawRectangle.js';
import {drawString} from './drawString.js';
import {createLayer, drawLayer} from './layer.js';

const normalizeTerminalText = (text) => {
  return text.split('\n').map((row) => row.replaceAll('⠀', ' ').trimEnd()).join('\n').trimEnd();
};

const renderCanvasToTerminalText = (canvas) => {
  return normalizeTerminalText(renderCanvasToRows(canvas).join('\n'));
};

test('matches the launch terminal output', () => {
  const terminal = {
    width: 140,
    height: 40,
  };
  const terminalInset = 2;
  const canvas = createCanvas(terminal.width, terminal.height);

  // Header
  const cwd = '~/Projects/grok';
  drawString(canvas, {x: terminalInset, y: 1}, cwd, '#3D3D3D');

  // Body
  const logoLayer = createLayer([
    '⠀⠀⠀⠀⠀⠀⣀⣀⡀⠀⠀⠀⣠⠀',
    '⠀⠀⠀⣠⣾⠿⠛⠛⠛⠛⢀⣴⠃⠀',
    '⠀⠀⣼⡟⠁⠀⠀⠀⢀⡴⠻⣿⡀⠀',
    '⠀⠀⣿⡇⠀⠀⠀⠔⠁⠀⠀⣿⡇⠀',
    '⠀⠀⢹⣷⠀⠀⠀⠀⠀⢀⣴⡿⠀⠀',
    '⠀⢀⠞⠁⠠⢶⣶⣶⣶⠿⠋⠀⠀⠀',
  ]);

  const menuWidth = 37;
  const menuShortcutX = menuWidth - 6;
  const shortcutsLayer = createLayer();

  drawString(shortcutsLayer, {x: 0, y: 0}, 'New worktree', '#5C5C5C');
  drawString(shortcutsLayer, {x: menuShortcutX, y: 0}, 'ctrl-w', '#3D3D3D');
  drawLine(shortcutsLayer, {x: 0, y: 1}, {x: menuWidth - 1, y: 1}, '#3D3D3D');
  drawString(shortcutsLayer, {x: 0, y: 2}, 'Resume session', '#5C5C5C');
  drawString(shortcutsLayer, {x: menuShortcutX, y: 2}, 'ctrl-s', '#3D3D3D');
  drawLine(shortcutsLayer, {x: 0, y: 3}, {x: menuWidth - 1, y: 3}, '#3D3D3D');
  drawString(shortcutsLayer, {x: 0, y: 4}, 'Quit', '#5C5C5C');
  drawString(shortcutsLayer, {x: menuShortcutX, y: 4}, 'ctrl-q', '#3D3D3D');

  const logoY = 7;

  drawLayer(canvas, logoLayer, {x: 63, y: logoY});
  drawLayer(canvas, shortcutsLayer, {x: 52, y: logoY + logoLayer.height + 2});

  // Footer
  const promptFrame = {
    x: terminalInset,
    y: 34,
    width: 136,
    height: 3,
  };

  drawRectangle(canvas, promptFrame, promptFrame, '#323237');
  drawString(canvas, {x: promptFrame.x + 2, y: promptFrame.y + 1}, '❯', '#414141');

  const modelText = ' Grok Build ';
  const separatorText = '·';
  const modeText = ' always-approve ';
  const footerLength = modelText.length + separatorText.length + modeText.length;
  const footerX = promptFrame.x + promptFrame.width - footerLength - 2;
  const footerY = promptFrame.y + promptFrame.height - 1;

  drawString(canvas, {x: footerX, y: footerY}, modelText, '#5C5C5C');
  drawString(canvas, {x: footerX + modelText.length, y: footerY}, separatorText, '#3D3D3D');
  drawString(canvas, {x: footerX + modelText.length + separatorText.length, y: footerY}, modeText, '#404040');

  const tipLabel = 'Tip:';
  drawString(canvas, {x: terminalInset, y: promptFrame.y - 2}, tipLabel, '#5C5C5C');
  const tip = 'Press Ctrl+G to background a running terminal command.';
  drawString(canvas, {x: terminalInset + tipLabel.length + 1, y: promptFrame.y - 2}, tip, '#3D3D3D');
  const version = '0.2.14 [stable]';
  const release = 'Beta';
  const terminalContentRight = canvas.width - terminalInset;
  drawString(canvas, {x: terminalContentRight - version.length - 1 - release.length, y: canvas.height - 2}, version, '#3D3D3D');
  drawString(canvas, {x: terminalContentRight - release.length, y: canvas.height - 2}, release, '#E1E1E1');

  const expected = normalizeTerminalText(fs.readFileSync('./content/terminals/launch.txt', 'utf-8'));

  assert.equal(renderCanvasToTerminalText(canvas), expected);
});
