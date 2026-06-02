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
  const canvas = createCanvas(terminal.width, terminal.height);

  // Header
  const cwd = '~/Projects/grok';
  drawString(canvas, {x: 1, y: 1}, cwd, '#3D3D3D');

  // Body
  const logoLayer = createLayer([
    '⠀⠀⠀⠀⠀⣀⣀⡀⠀⠀⠀⣠',
    '⠀⠀⣠⣾⠿⠛⠛⠛⠛⢀⣴⠃',
    '⠀⣼⡟⠁⠀⠀⠀⢀⡴⠻⣿⡀',
    '⠀⣿⡇⠀⠀⠀⠔⠁⠀⠀⣿⡇',
    '⠀⢹⣷⠀⠀⠀⠀⠀⢀⣴⡿⠀',
    '⢀⠞⠁⠠⢶⣶⣶⣶⠿⠋⠀⠀',
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

  const bodyLayer = createLayer();
  const logoX = Math.floor((shortcutsLayer.width - logoLayer.width) / 2);
  drawLayer(bodyLayer, logoLayer, {x: logoX, y: 0});
  drawLayer(bodyLayer, shortcutsLayer, {x: 0, y: logoLayer.height + 1});
  drawLayer(canvas, bodyLayer, {
    x: Math.floor((canvas.width - bodyLayer.width) / 2),
    y: Math.floor((canvas.height - bodyLayer.height) / 2),
  });

  // Footer
  const promptFrame = drawPrompt(canvas, 'Build the terminal UI', 'Grok Build', 'always-approve');
  const tipLabel = 'Tip:';
  drawString(canvas, {x: 1, y: promptFrame.y - 2}, tipLabel, '#5C5C5C');
  const tip = 'Press Ctrl+R to reverse-search your prompt history';
  drawString(canvas, {x: 1 + tipLabel.length + 1, y: promptFrame.y - 2}, tip, '#3D3D3D');
  const version = '0.2.16 [stable]';
  const release = 'Beta';
  drawString(canvas, {x: canvas.width - version.length - 1 - release.length - 1, y: canvas.height - 1}, version, '#3D3D3D');
  drawString(canvas, {x: canvas.width - release.length - 1, y: canvas.height - 1}, release, '#E1E1E1');

  return <Canvas canvas={canvas} />;
};

export {Grok};
