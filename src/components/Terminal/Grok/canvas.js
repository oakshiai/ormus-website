const createCanvas = (width, height) => {
  const size = width * height;

  return {
    width,
    height,
    cursor: {
      x: 0,
      y: 0,
    },
    cells: Array.from({length: size}, () => ({
      contents: ' ',
      color: undefined,
    })),
  };
};

const renderCanvasToRows = (canvas) => {
  const rows = [];

  for (let y = 0; y < canvas.height; y += 1) {
    const start = y * canvas.width;
    const end = start + canvas.width;

    rows.push(canvas.cells.slice(start, end).map((cell) => cell.contents).join(''));
  }

  return rows;
};

const renderCanvasToString = (canvas) => {
  return renderCanvasToRows(canvas).join('\n');
};

export {
  createCanvas,
  renderCanvasToRows,
  renderCanvasToString,
};
