const drawCharacter = (canvas, x, y, character, color) => {
  const index = (canvas.width * y) + x;

  if (!(index >= 0 && index < canvas.cells.length)) {
    return;
  }

  canvas.cells[index] = {
    contents: character,
    color,
  };
};

export {drawCharacter};