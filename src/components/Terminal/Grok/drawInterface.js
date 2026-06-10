import {createCanvas} from './canvas.js';
import {move} from './move.js';
import {drawString} from './drawString.js';
import {drawLine} from './drawLine.js';
import {drawRectangle} from './drawRectangle.js';
import {drawCharacter} from './drawCharacter.js';
import {createLayer, drawLayer} from './layer.js';
import {drawPrompt} from './drawPrompt.js';
import {COLORS} from './colors.js';
import {drawModal} from './drawModal.js';
import {drawShortcuts} from './drawShortcuts.js';

const PADDING = {
  top: 1,
  right: 2,
  bottom: 1,
  left: 2
};

const DESKTOP_MENU_WIDTH = 120;
const DESKTOP_MENU_MIN_WIDTH = 90;
const DESKTOP_MENU_MARGIN = 3;

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
 * @property {{count: number, descriptionColumn?: number, items: {command: string, description: string, selected?: boolean, scrollbar?: boolean, highlightIndexes?: number[]}[]}} [suggestions]
 * @property {string[]} [body]
 * @property {number} [promptHighlightLength]
 * @property {number} [mobileTipOffset]
 * @property {{sections: Array<{title: string, expanded?: boolean, count?: number, items?: Array<{label: string, keys: string}>}>}} [shortcuts]
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

const truncate = (string, maxLength) => {
  if (string.length <= maxLength) {
    return string;
  }

  return `${string.slice(0, maxLength - 1)}…`;
};

const wrapWords = (string, width) => {
  const words = string.split(' ');
  const lines = [];
  let line = '';

  for (const word of words) {
    const candidate = line.length === 0 ? word : `${line} ${word}`;

    if (candidate.length <= width) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }

  if (line.length > 0) {
    lines.push(line);
  }

  return lines;
};

const getCenteredX = (surface, width) => {
  return Math.floor((surface.width - width) / 2);
};

const getReleaseText = (model, release, width) => {
  if (width < DESKTOP_MENU_MIN_WIDTH) {
    return `${model}  ${release.version} [${release.channel}] ${release.label}`;
  }

  return `${model} ${release.label} [${release.channel}]`;
};

const drawReleaseText = (surface, model, release, width) => {
  if (width >= DESKTOP_MENU_MIN_WIDTH) {
    drawString(surface, getReleaseText(model, release, width), {anchor: 'right', color: COLORS.subtle});
    return;
  }

  const detail = `  ${release.version} [${release.channel}] `;
  const text = getReleaseText(model, release, width);
  const right = surface.cursor.x;

  move(surface, {x: right - text.length + 1});
  drawString(surface, model, {color: COLORS.text});
  drawString(surface, detail, {color: COLORS.subtle});
  drawString(surface, release.label, {color: COLORS.text});
};

const drawMenuAction = (surface, y, title, shortcut, layout) => {
  move(surface, {x: layout.actionLeft, y});
  drawString(surface, '[', {color: COLORS.muted});
  move(surface, {x: layout.actionTitleLeft});
  drawString(surface, title, {color: COLORS.text});
  move(surface, {x: layout.actionShortcutRight});
  drawString(surface, shortcut, {anchor: 'right', color: COLORS.panelText});
  move(surface, {x: layout.actionRight});
  drawString(surface, ']', {color: COLORS.muted});
};

const getMainMenuLayout = (surface) => {
  const width = Math.min(DESKTOP_MENU_WIDTH, surface.width - (DESKTOP_MENU_MARGIN * 2));
  const left = getCenteredX(surface, width);
  const right = left + width - 1;
  const actionLeft = left + 19;

  return {
    left,
    right,
    width,
    logoLeft: left + 2,
    actionLeft,
    actionTitleLeft: actionLeft + 2,
    actionShortcutRight: right - 6,
    actionRight: right - 3
  };
};

const drawMainMenu = (surface, {release}, y) => {
  if (surface.width < DESKTOP_MENU_MIN_WIDTH) {
    const logoWidth = 14;
    const layout = {
      actionLeft: 4,
      actionTitleLeft: 6,
      actionShortcutRight: surface.width - 8,
      actionRight: surface.width - 5
    };

    drawLogo(surface, {x: getCenteredX(surface, logoWidth), y});
    drawMenuAction(surface, y + 8, 'New worktree', 'ctrl-w', layout);
    drawMenuAction(surface, y + 9, 'Resume session', 'ctrl-s', layout);
    drawMenuAction(surface, y + 10, 'Quit', 'ctrl-q', layout);
    return;
  }

  const layout = getMainMenuLayout(surface);

  drawRectangle(surface, {x: layout.left, y}, {width: layout.width, height: 11}, COLORS.muted);
  drawLogo(surface, {x: layout.logoLeft, y: y + 2});

  move(surface, {x: layout.actionLeft, y: y + 2});
  drawString(surface, `Grok Build ${release.label}`, {color: COLORS.text});
  drawString(surface, `  ${release.version}`, {color: COLORS.subtle});
  move(surface, {x: layout.actionLeft, y: y + 3});
  drawString(surface, 'Try out Grok Build and give us /feedback!', {color: COLORS.subtle});
  move(surface, {x: layout.actionLeft, y: y + 5});
  drawLine(surface, {x: layout.actionRight}, {color: COLORS.divider});

  drawMenuAction(surface, y + 6, 'New worktree', 'ctrl-w', layout);
  drawMenuAction(surface, y + 7, 'Resume session', 'ctrl-s', layout);
  drawMenuAction(surface, y + 8, 'Quit', 'ctrl-q', layout);
};

const drawChangelog = (surface, changelog) => {
  if (surface.width < DESKTOP_MENU_MIN_WIDTH) {
    move(surface, {x: 5, y: 21});
    drawString(surface, changelog.title, {color: COLORS.panelText});
    move(surface, {x: surface.width - 21});
    drawString(surface, `[${changelog.action.label} ${changelog.action.keys}]`, {color: COLORS.subtle});

    for (let i = 0; i < changelog.items.length; i += 1) {
      move(surface, {x: 6, y: 23 + i});
      drawString(surface, truncate(`• ${changelog.items[i]}`, surface.width - 10), {color: COLORS.panelText});
    }

    return;
  }

  const layout = getMainMenuLayout(surface);
  const action = `[${changelog.action.label} ${changelog.action.keys}]`;

  move(surface, {x: layout.left + 1, y: 18});
  drawString(surface, changelog.title, {color: COLORS.panelText});
  move(surface, {x: layout.right - action.length});
  drawString(surface, action, {color: COLORS.subtle});

  for (let i = 0; i < changelog.items.length; i += 1) {
    move(surface, {x: layout.left + 2, y: 20 + i});
    drawString(surface, truncate(`• ${changelog.items[i]}`, layout.width - 4), {color: COLORS.panelText});
  }
};

const drawTip = (surface, y, tip) => {
  move(surface, {x: PADDING.left, y});
  drawString(surface, 'Tip:', {color: COLORS.subtle});
  move(surface, {deltaX: 1});
  const firstLineWidth = surface.width - surface.cursor.x - PADDING.right;
  const lines = wrapWords(tip, firstLineWidth);

  drawString(surface, lines[0], {color: COLORS.subtle});

  for (let i = 1; i < lines.length; i += 1) {
    move(surface, {x: PADDING.left, y: y + i});
    drawString(surface, lines[i], {color: COLORS.subtle});
  }
};

const drawIndicator = (surface, y, indicator) => {
  move(surface, {x: PADDING.left + 2, y});
  drawString(surface, `⠋ ${indicator.text} ${indicator.elapsed}`, {color: COLORS.muted});
};

const drawSuggestedShortcuts = (surface, shortcuts) => {
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

const drawBody = (surface, body) => {
  body.forEach((line, index) => {
    if (line.length === 0) {
      return;
    }

    move(surface, {x: PADDING.left + 3, y: PADDING.top + 2 + index});
    drawString(surface, line, {color: COLORS.subtle});
  });
};

const drawSuggestionSeparator = (surface, y, count) => {
  move(surface, {x: PADDING.left, y});
  drawLine(surface, {x: surface.width - PADDING.right - 1}, {color: COLORS.commandDivider});

  const label = String(count);
  move(surface, {x: surface.width - PADDING.right - label.length - 1, y});
  drawString(surface, label, {color: COLORS.subtle});
};

const getSuggestionDescriptionWidth = (surface, descriptionColumn) => {
  if (surface.width < DESKTOP_MENU_MIN_WIDTH) {
    return surface.width - descriptionColumn - PADDING.right - 6;
  }

  return surface.width - descriptionColumn - PADDING.right;
};

const getSuggestionDescriptionLines = (surface, suggestion, descriptionColumn) => {
  return wrapWords(suggestion.description, getSuggestionDescriptionWidth(surface, descriptionColumn));
};

const drawSuggestionItem = (surface, suggestion, y, descriptionColumn) => {
  const commandX = PADDING.left + 5;
  const highlightedIndexes = new Set(suggestion.highlightIndexes ?? []);
  const descriptionLines = getSuggestionDescriptionLines(surface, suggestion, descriptionColumn);

  if (suggestion.selected) {
    move(surface, {x: PADDING.left + 3, y});
    drawString(surface, '❯', {color: COLORS.text});
  }

  move(surface, {x: commandX, y});
  Array.from(suggestion.command).forEach((character, index) => {
    drawString(surface, character, {color: highlightedIndexes.has(index) ? COLORS.primary : COLORS.text});
  });
  move(surface, {x: descriptionColumn, y});
  drawString(surface, descriptionLines[0], {color: COLORS.subtle});

  for (let i = 1; i < descriptionLines.length; i += 1) {
    move(surface, {x: surface.width < DESKTOP_MENU_MIN_WIDTH ? descriptionColumn + 1 : descriptionColumn, y: y + i});
    drawString(surface, descriptionLines[i], {color: COLORS.subtle});
  }

  if (suggestion.scrollbar) {
    drawCharacter(surface, surface.width - PADDING.right - 1, y, '█', COLORS.muted);

    if (suggestion.selected) {
      for (let i = 1; i < descriptionLines.length; i += 1) {
        drawCharacter(surface, surface.width - PADDING.right - 1, y + i, '█', COLORS.muted);
      }
    }
  }

  return descriptionLines.length;
};

const drawSuggestions = (surface, footerTop, suggestions) => {
  const descriptionColumn = suggestions.descriptionColumn ?? 23;
  const rowCount = suggestions.items.reduce((count, suggestion) => {
    return count + getSuggestionDescriptionLines(surface, suggestion, descriptionColumn).length;
  }, 0);
  const top = footerTop - rowCount - 2;
  let y = top + 1;

  drawSuggestionSeparator(surface, top, suggestions.count);

  suggestions.items.forEach((suggestion) => {
    y += drawSuggestionItem(surface, suggestion, y, descriptionColumn);
  });

  move(surface, {x: PADDING.left, y});
  drawLine(surface, {x: surface.width - PADDING.right - 1}, {color: COLORS.commandDivider});
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
  changelog,
  suggestions,
  body,
  promptHighlightLength,
  mobileTipOffset = 3,
  shortcuts
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

  drawPrompt(footerLayer, prompt, model, mode, {highlightLength: promptHighlightLength});

  if (release) {
    // Version
    move(footerLayer, {x: footerLayer.width - 1, y: footerLayer.height + 1});
    drawReleaseText(footerLayer, model, release, width);
  }

  if (suggestedShortcuts.length > 0) {
    move(footerLayer, {x: 0, y: footerLayer.height + 1});
    drawSuggestedShortcuts(footerLayer, suggestedShortcuts);
  }

  if (shortcuts && suggestedShortcuts.length > 0) {
    // The suggested line was drawn to ensure footerLayer height produces the same
    // suggestions positioning as the recorded shortcuts fixtures. Hide the visual
    // bar (shortcuts modal is open) while preserving the row for correct height.
    const sugY = footerLayer.height - 1;
    for (let x = 0; x < footerLayer.width; x += 1) {
      drawCharacter(footerLayer, x, sugY, ' ', undefined);
    }
  }

  const footerTop = canvas.height - footerLayer.height - PADDING.bottom;

  drawLayer(canvas, footerLayer, {x: PADDING.left, y: footerTop});

  // Body
  if (thread.length === 0 && !prompt) {
    if (tip) {
      drawTip(canvas, width < DESKTOP_MENU_MIN_WIDTH ? footerTop - mobileTipOffset : footerTop - 2, tip);
    }

    if (release) {
      drawMainMenu(canvas, {release}, width < DESKTOP_MENU_MIN_WIDTH ? (changelog ? 9 : 11) : (changelog ? 6 : 8));
    }

    if (changelog) {
      drawChangelog(canvas, changelog);
    }
  }

  if (body) {
    drawBody(canvas, body);
  }

  if (suggestions) {
    drawSuggestions(canvas, footerTop, suggestions);
  }

  if (indicator) {
    drawIndicator(canvas, footerTop - 2, indicator);
  }

  if (shortcuts) {
    // Position the modal so its bottom border sits on the prompt frame for the
    // integrated look in the fixtures (hints on prompt top row, └┘ on prompt mid row).
    const modalWidth = Math.min(80, Math.max(50, width - 6));
    const modalLeft = Math.max(2, getCenteredX(canvas, modalWidth));
    const modalBottom = footerTop + 1;
    const modalHeight = modalBottom - 4 + 1;
    drawModal(canvas, {
      left: modalLeft,
      top: 4,
      width: modalWidth,
      height: modalHeight,
      title: 'Keyboard Shortcuts'
    });
    drawShortcuts(canvas, {
      left: modalLeft,
      top: 4,
      width: modalWidth,
      height: modalHeight,
      sections: shortcuts.sections ?? []
    });
  }

  return canvas;
};

export {drawInterface};
