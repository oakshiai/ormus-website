import {useTerminal} from '../TerminalContext.js';

import {createCanvas} from './canvas.js';
import {createLayer, drawLayer} from './layer.js';
import {drawString} from './drawString.js';
import {drawPrompt} from './drawPrompt.js';
import {drawLine} from './drawLine.js';

const getRowSegments = (canvas, y) => {
  const segments = [];
  const rowStart = canvas.width * y;
  const rowEnd = rowStart + canvas.width;

  for (let index = rowStart; index < rowEnd; index += 1) {
    const cell = canvas.cells[index];
    const previous = segments[segments.length - 1];

    if (previous && previous.color === cell.color) {
      previous.value += cell.contents;
      continue;
    }

    segments.push({
      color: cell.color,
      value: cell.contents,
    });
  }

  return segments;
};

const Canvas = (props) => {
  return Array.from({length: props.canvas.height}, (_, y) => (
    <span key={y}>
      {getRowSegments(props.canvas, y).map((segment, index) => (
        <span key={index} style={{color: segment.color}}>
          {segment.value}
        </span>
      ))}
      {y < props.canvas.height - 1 ? '\n' : null}
    </span>
  ));
};

const Grok = () => {
  const terminal = useTerminal();
  const terminalInset = 2;
  const canvas = createCanvas(terminal.width, terminal.height);

  // Header
  const cwd = '~/Projects/grok';
  drawString(canvas, {x: terminalInset, y: 1}, cwd, '#3D3D3D');

  // Body
  const logoLayer = createLayer([
    '⠀⠀⠀⠀⠀⣀⣀⡀⠀⠀⠀⣠',
    '⠀⠀⣠⣾⠿⠛⠛⠛⠛⢀⣴⠃',
    '⠀⣼⡟⠁⠀⠀⠀⢀⡴⠻⣿⡀',
    '⠀⣿⡇⠀⠀⠀⠔⠁⠀⠀⣿⡇',
    '⠀⢹⣷⠀⠀⠀⠀⠀⢀⣴⡿⠀',
    '⢀⠞⠁⠠⢶⣶⣶⣶⠿⠋⠀⠀',
  ], '#3D3D3D');

  const menuWidth = 37;
  const menuShortcutX = menuWidth - 6;
  const shortcutsLayer = createLayer();

  drawString(shortcutsLayer, {x: 0, y: 0}, 'New worktree', '#E1E1E1');
  drawString(shortcutsLayer, {x: menuShortcutX, y: 0}, 'ctrl-w', '#3D3D3D');
  drawLine(shortcutsLayer, {x: 0, y: 1}, {x: menuWidth - 1, y: 1}, '#3D3D3D');
  drawString(shortcutsLayer, {x: 0, y: 2}, 'Resume session', '#E1E1E1');
  drawString(shortcutsLayer, {x: menuShortcutX, y: 2}, 'ctrl-s', '#3D3D3D');
  drawLine(shortcutsLayer, {x: 0, y: 3}, {x: menuWidth - 1, y: 3}, '#3D3D3D');
  drawString(shortcutsLayer, {x: 0, y: 4}, 'Quit', '#E1E1E1');
  drawString(shortcutsLayer, {x: menuShortcutX, y: 4}, 'ctrl-q', '#3D3D3D');

  const menuTopGap = 1;
  const menuGap = 2;
  const menuBlockWidth = Math.max(logoLayer.width, shortcutsLayer.width);
  const menuBlockX = Math.max(0, Math.ceil((canvas.width - menuBlockWidth) / 2));
  const menuBlockY = logoLayer.height + menuTopGap;
  const logoX = menuBlockX + Math.floor((menuBlockWidth - logoLayer.width) / 2);
  const shortcutsX = menuBlockX + Math.floor((menuBlockWidth - shortcutsLayer.width) / 2);

  drawLayer(canvas, logoLayer, {x: logoX, y: menuBlockY});
  drawLayer(canvas, shortcutsLayer, {x: shortcutsX, y: menuBlockY + logoLayer.height + menuGap});

  // Footer
  const promptFrame = drawPrompt(canvas, '', 'Grok Build', 'always-approve');
  const tipLabel = 'Tip:';
  drawString(canvas, {x: terminalInset, y: promptFrame.y - 2}, tipLabel, '#5C5C5C');
  const tip = 'Press Ctrl+G to background a running terminal command.';
  drawString(canvas, {x: terminalInset + tipLabel.length + 1, y: promptFrame.y - 2}, tip, '#3D3D3D');
  const version = '0.2.14 [stable]';
  const release = 'Beta';
  const terminalContentRight = canvas.width - terminalInset;
  drawString(canvas, {x: terminalContentRight - version.length - 1 - release.length, y: canvas.height - 2}, version, '#3D3D3D');
  drawString(canvas, {x: terminalContentRight - release.length, y: canvas.height - 2}, release, '#E1E1E1');

  return <Canvas canvas={canvas} />;
};

export {Grok};
