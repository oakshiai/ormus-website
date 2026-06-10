import {move} from './move.js';
import {drawString} from './drawString.js';
import {COLORS} from './colors.js';

const ITEM_LEFT_PAD = 4;  // spaces after │ before ◆ for items

const drawShortcuts = (surface, {left, top, width, height, sections = []}) => {
  const right = left + width - 1;
  const bottom = top + height - 1;
  const contentWidth = width - 2; // between the two │
  const keyRightCol = right - 4; // last char of key text lands here (then 3 spaces + right │)

  // Blank row after top border, then search hint
  // Divider after search
  const searchY = top + 2;
  move(surface, {x: left + 1, y: searchY});
  drawString(surface, '   ', {color: COLORS.muted});
  drawString(surface, '/', {color: COLORS.muted});
  drawString(surface, ' to search', {color: COLORS.muted});

  // Divider row
  const dividerY = top + 3;
  move(surface, {x: left + 1, y: dividerY});
  drawString(surface, '─'.repeat(contentWidth), {color: COLORS.muted});

  // Accordion content starts here
  let y = top + 4;

  for (const section of sections) {
    if (y > bottom - 2) {
      break; // do not overflow the reserved hints/bottom row
    }

    const isExpanded = !!section.expanded;
    const icon = isExpanded ? '◆' : '›';
    const iconColor = COLORS.muted;

    // Section header line: "  ◆ Title" or "  › Title (N)"
    move(surface, {x: left + 1, y});
    drawString(surface, '  ', {color: COLORS.subtle});
    drawString(surface, icon, {color: iconColor});
    drawString(surface, ' ' + section.title, {color: COLORS.text});
    if (!isExpanded && typeof section.count === 'number') {
      drawString(surface, ` (${section.count})`, {color: COLORS.text});
    }

    y += 1;

    if (isExpanded && Array.isArray(section.items)) {
      for (const item of section.items) {
        if (y > bottom - 2) {
          break;
        }

        // Item line: "    ◆ Label" + keys right aligned
        move(surface, {x: left + 1, y});
        drawString(surface, ' '.repeat(ITEM_LEFT_PAD), {color: COLORS.subtle});
        drawString(surface, '◆', {color: COLORS.muted});
        drawString(surface, ' ', {color: COLORS.subtle});
        const labelColor = item.label === 'Focus prompt' ? COLORS.muted : COLORS.text;
        drawString(surface, item.label, {color: labelColor});

        if (item.keys) {
          const keyX = keyRightCol - item.keys.length + 1;
          move(surface, {x: keyX, y});
          drawString(surface, item.keys, {color: COLORS.subtle});
        }

        y += 1;
      }
    }
  }

  // Bottom hints bar on the last inner row (this row aligns with prompt top in layout)
  // Drawn semantically by role (key combos vs. labels vs. separators) rather than
  // positionally from a recorded color tape.
  const hintsY = bottom - 1;
  move(surface, {x: left + 1, y: hintsY});

  const HINT_ITEMS = [
    { shortcut: '↑/↓', title: ' nav' },
    { shortcut: 'f', title: ' filter' },
    { shortcut: 'e/Enter/Space', title: ' expand' },
    { shortcut: '/', title: ' search' },
    { shortcut: 'Esc', title: ' close' },
  ];

  const KEY_COLOR = '#c8c8c8';   // key bindings / hotkeys
  const LABEL_COLOR = '#6c6c6c'; // descriptive text
  const SEP_COLOR = '#585858';   // separators

  drawString(surface, '   ', {color: KEY_COLOR});
  HINT_ITEMS.forEach((item, i) => {
    if (i > 0) {
      drawString(surface, '  |  ', {color: SEP_COLOR});
    }
    drawString(surface, item.shortcut, {color: KEY_COLOR});
    drawString(surface, item.title, {color: LABEL_COLOR});
  });
};

export {drawShortcuts};
