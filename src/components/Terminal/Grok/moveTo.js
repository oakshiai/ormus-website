/**
 * @typedef {Object} Position
 * @property {number} [x]
 * @property {number} [y]
 * @property {number} [deltaX]
 * @property {number} [deltaY]
 */

/**
 * @param {{cursor: {x: number, y: number}}} surface
 * @param {Position} position
 */
const moveTo = (surface, position) => {
  if (position.x !== undefined) {
    surface.cursor.x = position.x;
  } else if (position.deltaX !== undefined) {
    surface.cursor.x += position.deltaX;
  }

  if (position.y !== undefined) {
    surface.cursor.y = position.y;
  } else if (position.deltaY !== undefined) {
    surface.cursor.y += position.deltaY;
  }
};

export {moveTo};