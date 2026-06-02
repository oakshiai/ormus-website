import {drawCharacter} from './drawCharacter.js';

const createCell = (contents, color) => {
  return {
    contents,
    color,
  };
};

const createCellRow = (row) => {
  if (typeof row === 'string') {
    return Array.from(row, (character) => createCell(character, undefined));
  }

  return row.map((cell) => {
    if (!cell) {
      return cell;
    }

    return createCell(cell.contents, cell.color);
  });
};

const createLayer = (rows = []) => {
  return {
    rows: rows.map(createCellRow),
    get width() {
      return this.rows.reduce((width, row) => Math.max(width, row.length), 0);
    },
    get height() {
      return this.rows.length;
    },
  };
};

const getCenteredOrigin = (canvas, layer) => {
  return {
    x: Math.floor((canvas.width - layer.width) / 2),
    y: Math.floor((canvas.height - layer.height) / 2),
  };
};

const drawLayer = (canvas, layer, origin) => {
  layer.rows.forEach((row, layerY) => {
    row.forEach((cell, layerX) => {
      if (!cell || cell.contents === ' ') {
        return;
      }

      drawCharacter(canvas, origin.x + layerX, origin.y + layerY, cell.contents, cell.color);
    });
  });

  return {
    x: origin.x,
    y: origin.y,
    width: layer.width,
    height: layer.height,
  };
};

export {
  createLayer,
  drawLayer,
  getCenteredOrigin,
};
