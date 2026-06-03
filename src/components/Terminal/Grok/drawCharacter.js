const drawInLayer = (layer, x, y, character, color) => {
  while (layer.rows.length <= y) {
    layer.rows.push([]);
  }

  layer.rows[y][x] = {
    contents: character,
    color,
  };
};

const drawInCanvas = (canvas, x, y, character, color) => {
  if (!(x >= 0 && x < canvas.width && y >= 0 && y < canvas.height)) {
    throw new RangeError(`Character coordinates out of bounds: (${x}, ${y})`);
  }

  canvas.cells[(canvas.width * y) + x] = {
    contents: character,
    color,
  };
};

const drawCharacter = (surface, x, y, character, color) => {
  if (surface.rows) {
    drawInLayer(surface, x, y, character, color);
  } else {
    drawInCanvas(surface, x, y, character, color);
  }

  surface.cursor = {x: x + 1, y};
  surface.color = color;
};

export {drawCharacter};
