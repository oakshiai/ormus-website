import {useTerminal} from '../TerminalContext.js';
import {drawInterface} from './drawInterface.js';

const getRowCells = (canvas, y) => {
  const cells = [];
  const rowStart = canvas.width * y;
  const rowEnd = rowStart + canvas.width;

  for (let index = rowStart; index < rowEnd; index += 1) {
    cells.push(canvas.cells[index]);
  }

  return cells;
};

const Canvas = (props) => {
  return Array.from({length: props.canvas.height}, (_, y) => (
    <span key={y} className="terminal-row">
      {getRowCells(props.canvas, y).map((cell, index) => (
        <span key={index} className="terminal-cell" style={{color: cell.color}}>
          {cell.contents}
        </span>
      ))}
    </span>
  ));
};

const Grok = (props) => {
  const terminal = useTerminal();

  const canvas = drawInterface({
    width: terminal.width,
    height: terminal.height,
    ...props
  });

  return <Canvas canvas={canvas} />;
};

export {Grok};
