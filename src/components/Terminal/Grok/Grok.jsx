import {useTerminal} from '../TerminalContext.js';

import {createCanvas} from './canvas.js';
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
  drawString(canvas, {x: canvas.width / 2 - 6, y: canvas.height / 2 - 3}, '⠀⠀⠀⠀⠀⣀⣀⡀⠀⠀⠀⣠', '#5C5C5C');
  drawString(canvas, {x: canvas.width / 2 - 6, y: canvas.height / 2 - 2}, '⠀⠀⣠⣾⠿⠛⠛⠛⠛⢀⣴⠃', '#5C5C5C');
  drawString(canvas, {x: canvas.width / 2 - 6, y: canvas.height / 2 - 1}, '⠀⣼⡟⠁⠀⠀⠀⢀⡴⠻⣿⡀', '#5C5C5C');
  drawString(canvas, {x: canvas.width / 2 - 6, y: canvas.height / 2 - 0}, '⠀⣿⡇⠀⠀⠀⠔⠁⠀⠀⣿⡇', '#5C5C5C');
  drawString(canvas, {x: canvas.width / 2 - 6, y: canvas.height / 2 + 1}, '⠀⢹⣷⠀⠀⠀⠀⠀⢀⣴⡿⠀', '#5C5C5C');
  drawString(canvas, {x: canvas.width / 2 - 6, y: canvas.height / 2 + 2}, '⢀⠞⠁⠠⢶⣶⣶⣶⠿⠋⠀⠀', '#5C5C5C');

  const menuWidth = 37;
  const menuX = canvas.width / 2 - 6;
  const menuY = canvas.height / 2 + 4;
  const menuShortcutX = menuX + menuWidth - 6;

  drawString(canvas, {x: menuX, y: menuY}, 'New worktree', '#5C5C5C');
  drawString(canvas, {x: menuShortcutX, y: menuY}, 'ctrl-w', '#3D3D3D');
  drawLine(canvas, {x: menuX, y: menuY + 1}, {x: menuX + menuWidth - 1, y: menuY + 1}, '#3D3D3D');
  drawString(canvas, {x: menuX, y: menuY + 2}, 'Resume session', '#5C5C5C');
  drawString(canvas, {x: menuShortcutX, y: menuY + 2}, 'ctrl-s', '#3D3D3D');
  drawLine(canvas, {x: menuX, y: menuY + 3}, {x: menuX + menuWidth - 1, y: menuY + 3}, '#3D3D3D');
  drawString(canvas, {x: menuX, y: menuY + 4}, 'Quit', '#5C5C5C');
  drawString(canvas, {x: menuShortcutX, y: menuY + 4}, 'ctrl-q', '#3D3D3D');

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
