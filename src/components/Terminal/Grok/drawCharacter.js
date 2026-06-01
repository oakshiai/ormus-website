const drawCharacter = (canvas, x, y, character, color) => {
  if (!(x >= 0 && x < canvas.width && y >= 0 && y < canvas.height)) {
    throw new RangeError(`Character coordinates out of bounds: (${x}, ${y})`);
  }

  const index = (canvas.width * y) + x;

  canvas.cells[index] = {
    contents: character,
    color,
  };
};

export {drawCharacter};
