import {createCanvas} from './canvas.js';
import {move} from './move.js';
import {drawString} from './drawString.js';
import {drawLine} from './drawLine.js';
import {drawRectangle} from './drawRectangle.js';
import {createLayer, drawLayer} from './layer.js';
import {drawPrompt} from './drawPrompt.js';
import {COLORS} from './colors.js';

const PADDING = {
  top: 1,
  right: 2,
  bottom: 1,
  left: 2
};

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
 * @property {{used: string, remaining: string}} [context]
 * @property {object[]} thread
 * @property {string} [prompt]
 * @property {string} [tip]
 * @property {{text: string, elapsed: string}} [indicator]
 * @property {string} model
 * @property {string} mode
 * @property {ModelRelease} [release]
 * @property {{keys: string, effect: string}[]} [suggestedShortcuts]
 * @property {{title: string, action: {label: string, keys: string}, items: string[]}} [changelog]
 */

const drawLogo = (surface, origin) => {
  const logoLayer = createLayer({
    rows: [
      '⠀⠀⠀⠀⠀⠀⣀⣀⡀⠀⠀⠀⣠⠀',
      '⠀⠀⠀⣠⣾⠿⠛⠛⠛⠛⢀⣴⠃⠀',
      '⠀⠀⣼⡟⠁⠀⠀⠀⢀⡴⠻⣿⡀⠀',
      '⠀⠀⣿⡇⠀⠀⠀⠔⠁⠀⠀⣿⡇⠀',
      '⠀⠀⢹⣷⠀⠀⠀⠀⠀⢀⣴⡿⠀⠀',
      '⠀⢀⠞⠁⠠⢶⣶⣶⣶⠿⠋⠀⠀⠀',
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀'
    ],
    color: COLORS.subtle
  });

  drawLayer(surface, logoLayer, origin);
};

const drawMenuAction = (surface, y, title, shortcut) => {
  move(surface, {x: 29, y});
  drawString(surface, '[', {color: COLORS.muted});
  move(surface, {x: 31});
  drawString(surface, title, {color: COLORS.text});
  move(surface, {x: 123});
  drawString(surface, shortcut, {anchor: 'right', color: COLORS.panelText});
  move(surface, {x: 126});
  drawString(surface, ']', {color: COLORS.muted});
};

const drawMainMenu = (surface, {release}, origin) => {
  drawRectangle(surface, origin, {width: 120, height: 11}, COLORS.muted);
  drawLogo(surface, {x: origin.x + 2, y: origin.y + 2});

  move(surface, {x: 29, y: origin.y + 2});
  drawString(surface, `Grok Build ${release.label}`, {color: COLORS.text});
  drawString(surface, `  ${release.version}`, {color: COLORS.subtle});
  move(surface, {x: 29, y: origin.y + 3});
  drawString(surface, 'Try out Grok Build and give us /feedback!', {color: COLORS.subtle});
  move(surface, {x: 29, y: origin.y + 5});
  drawLine(surface, {x: 126}, {color: COLORS.divider});

  drawMenuAction(surface, origin.y + 6, 'New worktree', 'ctrl-w');
  drawMenuAction(surface, origin.y + 7, 'Resume session', 'ctrl-s');
  drawMenuAction(surface, origin.y + 8, 'Quit', 'ctrl-q');
};

const drawChangelog = (surface, changelog) => {
  move(surface, {x: 11, y: 18});
  drawString(surface, changelog.title, {color: COLORS.panelText});
  move(surface, {x: 113});
  drawString(surface, `[${changelog.action.label} ${changelog.action.keys}]`, {color: COLORS.subtle});

  for (let i = 0; i < changelog.items.length; i += 1) {
    move(surface, {x: 12, y: 20 + i});
    drawString(surface, `• ${changelog.items[i]}`, {color: COLORS.panelText});
  }
};

const drawTip = (surface, y, tip) => {
  move(surface, {x: PADDING.left, y});
  drawString(surface, 'Tip:', {color: COLORS.subtle});
  move(surface, {deltaX: 1});
  drawString(surface, tip, {color: COLORS.subtle});
};

const drawIndicator = (surface, y, indicator) => {
  move(surface, {x: PADDING.left + 2, y});
  drawString(surface, `⠋ ${indicator.text} ${indicator.elapsed}`, {color: COLORS.muted});
};

const drawShortcuts = (surface, shortcuts) => {
  shortcuts.forEach(({keys, effect}, index) => {
    if (index > 0) {
      drawString(surface, '  │  ', {color: COLORS.subtle});
    }

    drawString(surface, keys, {color: COLORS.primaryMuted});
    drawString(surface, `:${effect}`, {color: COLORS.subtle});
  });
};

const drawContext = (surface, width, context) => {
  const label = `│ ${context.used} / ${context.remaining} │`;

  move(surface, {x: width - PADDING.right - label.length, y: PADDING.top});
  drawString(surface, '│', {color: COLORS.muted});
  drawString(surface, ` ${context.used} / ${context.remaining} `, {color: COLORS.text});
  drawString(surface, '│', {color: COLORS.muted});
};

/**
 * @param {InterfaceOptions} options
 */
const drawInterface = ({
  width,
  height,
  branch,
  cwd,
  context,
  thread,
  prompt,
  tip,
  indicator,
  model,
  mode,
  release,
  suggestedShortcuts = [],
  changelog
}) => {
  const canvas = createCanvas(width, height);
  
  // Header
  move(canvas, {x: PADDING.left, y: PADDING.top});
  if (branch) {
    drawString(canvas, '', {color: COLORS.text});
    move(canvas, {deltaX: 1});
    drawString(canvas, branch, {color: COLORS.text});
    move(canvas, {deltaX: 1});
  }

  drawString(canvas, context ? cwd.replace(/\/$/, '') : cwd, {color: COLORS.muted});
  if (context) {
    drawContext(canvas, width, context);
  }

  // Footer
  const footerLayer = createLayer({width: width - PADDING.left - PADDING.right});

  drawPrompt(footerLayer, prompt, model, mode);

  if (release) {
    // Version
    move(footerLayer, {x: footerLayer.width - 1, y: footerLayer.height + 1});
    drawString(footerLayer, `${model} ${release.label} [${release.channel}]`, {anchor: 'right', color: COLORS.subtle});
  }

  if (suggestedShortcuts.length > 0) {
    move(footerLayer, {x: 0, y: footerLayer.height + 1});
    drawShortcuts(footerLayer, suggestedShortcuts);
  }

  const footerTop = canvas.height - footerLayer.height - PADDING.bottom;

  drawLayer(canvas, footerLayer, {x: PADDING.left, y: footerTop});

  // Body
  if (thread.length === 0 && !prompt) {
    if (tip) {
      drawTip(canvas, footerTop - 2, tip);
    }

    if (release) {
      drawMainMenu(canvas, {release}, {x: 10, y: changelog ? 6 : 8});
    }

    if (changelog) {
      drawChangelog(canvas, changelog);
    }
  }

  if (indicator) {
    drawIndicator(canvas, footerTop - 2, indicator);
  }

  return canvas;
};

export {drawInterface};
