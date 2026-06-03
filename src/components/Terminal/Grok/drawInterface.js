import {createCanvas} from './canvas.js';
import {move} from './move.js';
import {drawString} from './drawString.js';
import {drawLine} from './drawLine.js';
import {createLayer, drawLayer} from './layer.js';
import {drawPrompt} from './drawPrompt.js';

const PADDING = {
  top: 1,
  right: 2,
  bottom: 1,
  left: 2
};
const BODY_VERTICAL_BIAS = 3 / 8;

/**
 * @typedef {Object} ModelRelease
 * @property {string} version
 * @property {string} channel
 * @property {string} label
 */

/**
 * @typedef {Object} InterfaceOptions
 * @property {number} width
 * @property {number} height
 * @property {string} [branch]
 * @property {string} cwd
 * @property {string} model
 * @property {string} mode
 * @property {ModelRelease} release
 * @property {string} tip
 */

/**
 * @param {InterfaceOptions} options
 */
const drawInterface = ({
  width,
  height,
  branch,
  cwd,
  model,
  mode,
  release,
  tip
}) => {
  const canvas = createCanvas(width, height);
  
  // Header
  move(canvas, {x: PADDING.left, y: PADDING.top});
  if (branch) {
    drawString(canvas, '', {color: '#5C5C5C'});
    move(canvas, {deltaX: 1});
    drawString(canvas, branch, {color: '#E1E1E1'});
    move(canvas, {deltaX: 1});
  }

  drawString(canvas, cwd, {color: '#3D3D3D'});

  // Footer
  const footerLayer = createLayer({width: width - PADDING.left - PADDING.right});

  drawPrompt(footerLayer, '', model, mode);

  // Version
  move(footerLayer, {x: footerLayer.width - 1, y: footerLayer.height + 1});
  drawString(footerLayer, release.label, {anchor: 'right', color: '#E1E1E1'});
  move(footerLayer, {deltaX: -1});
  drawString(footerLayer, `[${release.channel}]`, {anchor: 'right', color: '#3D3D3D'});
  move(footerLayer, {deltaX: -1});
  drawString(footerLayer, release.version, {anchor: 'right', color: '#3D3D3D'});

  drawLayer(canvas, footerLayer, {x: PADDING.left, y: canvas.height - footerLayer.height});

  // Tip
  move(canvas, {x: PADDING.left, y: canvas.height - footerLayer.height - 2});
  drawString(canvas, 'Tip:', {color: '#5C5C5C'});
  move(canvas, {deltaX: 1});
  drawString(canvas, tip, {color: '#3D3D3D'});

  // Body
  const logoLayer = createLayer({
    rows: [
      ' ⠀⠀⠀⠀⠀⠀⣀⣀⡀⠀⠀⠀⣠⠀',
      ' ⠀⠀⠀⣠⣾⠿⠛⠛⠛⠛⢀⣴⠃⠀',
      ' ⠀⠀⣼⡟⠁⠀⠀⠀⢀⡴⠻⣿⡀⠀',
      ' ⠀⠀⣿⡇⠀⠀⠀⠔⠁⠀⠀⣿⡇⠀',
      ' ⠀⠀⢹⣷⠀⠀⠀⠀⠀⢀⣴⡿⠀⠀',
      ' ⠀⢀⠞⠁⠠⢶⣶⣶⣶⠿⠋⠀⠀⠀',
      ' ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀'
    ],
    color: '#3D3D3D'
  });

  const shortcutsLayer = createLayer();
  const menuWidth = 37;

  const shortcuts = [
    {title: 'New worktree', shortcut: 'ctrl-w'},
    {title: 'Resume session', shortcut: 'ctrl-s'},
    {title: 'Quit', shortcut: 'ctrl-q'},
  ];
  for (let i = 0; i < shortcuts.length; i += 1) {
    const {title, shortcut} = shortcuts[i];

    drawString(shortcutsLayer, title, {color: '#E1E1E1'});
    move(shortcutsLayer, {x: menuWidth - 1});
    drawString(shortcutsLayer, shortcut, {anchor: 'right', color: '#3D3D3D'});
    move(shortcutsLayer, {x: 0, deltaY: 1});
    if (i < shortcuts.length - 1) {
      drawLine(shortcutsLayer, {x: menuWidth - 1}, {color: '#3D3D3D'});
      move(shortcutsLayer, {x: 0, deltaY: 1});
    }
  }

  const bodyLayer = createLayer();
  drawLayer(bodyLayer, logoLayer, {x: Math.floor(shortcutsLayer.width / 2 - logoLayer.width / 2), y: 0});
  drawLayer(bodyLayer, shortcutsLayer, {x: 1, y: logoLayer.height + 1});

  const footerTop = canvas.height - footerLayer.height;
  const bodyAreaBottom = footerTop - 3;

  drawLayer(canvas, bodyLayer, {
    x: Math.floor(canvas.width / 2 - bodyLayer.width / 2),
    y: Math.round((bodyAreaBottom - bodyLayer.height) * BODY_VERTICAL_BIAS)
  });

  return canvas;
};

export {drawInterface};
