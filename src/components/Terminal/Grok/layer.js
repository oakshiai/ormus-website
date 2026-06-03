import {drawCharacter} from './drawCharacter.js';

const createCell = (contents, color) => {
  return {
    contents,
    color,
  };
};

const createCellRow = (row, color) => {
  if (typeof row === 'string') {
    return Array.from(row, (character) => createCell(character, color));
  }

  return row.map((cell) => {
    if (!cell) {
      return cell;
    }

    return createCell(cell.contents, cell.color ?? color);
  });
};

const createLayer = ({rows = [], width, height, color} = {}) => {
  return {
    rows: rows.map((row) => createCellRow(row, color)),
    cursor: {
      x: 0,
      y: 0,
    },
    color: undefined,
    get width() {
      if (width) {
        return width;
      }
      return this.rows.reduce((width, row) => Math.max(width, row.length), 0);
    },
    get height() {
      if (height) {
        return height;
      }
      return this.rows.length;
    },
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
};
