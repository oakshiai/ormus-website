import {useTerminal} from '../TerminalContext.js';

import {createCanvas} from './createCanvas.js';
import {drawRectangle} from './drawRectangle.js';
import {drawString} from './drawString.js';

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
  const message = 'Something that goes on that line and breaks if needed';
  const messageFrom = {x: 10, y: 10};

  if (terminal.width === 0 || terminal.height === 0) {
    return <Canvas canvas={canvas} />;
  }

  if (terminal.height > 6) {
    drawRectangle(canvas, {x: 0, y: 2}, {width: terminal.width, height: 5}, 'red');
  }

  if (
    messageFrom.x < terminal.width
    && messageFrom.y < terminal.height
    && message.length <= (terminal.width - messageFrom.x) * (terminal.height - messageFrom.y)
  ) {
    drawString(canvas, messageFrom, message, 'orange');
  }

  return <Canvas canvas={canvas} />;
};

export {Grok};
