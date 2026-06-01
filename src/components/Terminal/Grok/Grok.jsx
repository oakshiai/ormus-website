import {useTerminal} from '../TerminalContext.js';

const createCanvas = (width, height) => {
  const size = width * height;

  return {
    width,
    height,
    cells: Array.from({length: size}, () => ({
      contents: ' ',
      color: undefined,
    })),
  };
};

const toPoint = (point) => {
  return {
    x: Math.floor(Number(point?.x) || 0),
    y: Math.floor(Number(point?.y) || 0),
  };
};

const toIndex = (canvas, x, y) => {
  if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
    return undefined;
  }

  return (canvas.width * y) + x;
};

const drawCharacter = (canvas, x, y, character, color) => {
  const index = toIndex(canvas, x, y);

  if (index == null) {
    return;
  }

  canvas.cells[index] = {
    contents: String(character).charAt(0) || ' ',
    color,
  };
};

const drawLine = (canvas, options) => {
  const from = toPoint(options.from);
  const to = toPoint(options.to);
  const deltaX = Math.abs(to.x - from.x);
  const deltaY = -Math.abs(to.y - from.y);
  const stepX = from.x < to.x ? 1 : -1;
  const stepY = from.y < to.y ? 1 : -1;
  const character = options.character ?? (from.x === to.x ? '│' : from.y === to.y ? '─' : '*');

  let error = deltaX + deltaY;
  let x = from.x;
  let y = from.y;

  while (true) {
    drawCharacter(canvas, x, y, character, options.color);

    if (x === to.x && y === to.y) {
      break;
    }

    const doubleError = error * 2;

    if (doubleError >= deltaY) {
      error += deltaY;
      x += stepX;
    }

    if (doubleError <= deltaX) {
      error += deltaX;
      y += stepY;
    }
  }
};

const drawText = (canvas, options) => {
  const from = toPoint(options.from);
  const text = String(options.text ?? '');
  const startX = Math.min(Math.max(from.x, 0), canvas.width);

  let x = from.x;
  let y = from.y;

  for (const character of text) {
    if (character === '\n') {
      x = startX;
      y += 1;
      continue;
    }

    if (x >= canvas.width) {
      x = startX;
      y += 1;
    }

    drawCharacter(canvas, x, y, character, options.color);
    x += 1;
  }
};

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

  drawLine(canvas, {
    from: {x: 0, y: 2},
    to: {x: terminal.width, y: 2},
    color: 'red',
  });
  drawLine(canvas, {
    from: {x: 0, y: 3},
    to: {x: 0, y: 5},
    color: 'red',
  });
  drawLine(canvas, {
    from: {x: 0, y: 6},
    to: {x: terminal.width, y: 6},
    color: 'red',
  });
  drawCharacter(canvas, 0, 2, '╭', 'red');
  drawCharacter(canvas, 0, 6, '╰', 'red');
  // drawLine(canvas, {
  //   from: {x: 0, y: 3},
  //   to: {x: 0, y: terminal.height},
  //   color: 'blue',
  // });
  drawText(canvas, {
    from: {x: 10, y: 10},
    color: 'orange',
    text: 'Something that goes on that line and breaks if needed',
  });

  return <Canvas canvas={canvas} />;
};

export {Grok};
