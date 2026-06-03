/**
 * @typedef {Object} Position
 * @property {number} [x]
 * @property {number} [y]
 * @property {number} [deltaX]
 * @property {number} [deltaY]
 */

/**
 * @param {{cursor: {x: number, y: number}}} canvas
 * @param {Position} position
 */
const moveTo = (canvas, position) => {
  if (position.x !== undefined) {
    canvas.cursor.x = position.x;
  } else if (position.deltaX !== undefined) {
    canvas.cursor.x += position.deltaX;
  }

  if (position.y !== undefined) {
    canvas.cursor.y = position.y;
  } else if (position.deltaY !== undefined) {
    canvas.cursor.y += position.deltaY;
  }
};

export {moveTo};