import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {css, cx, injectGlobal} from '@emotion/css';
import {TerminalContext} from './TerminalContext.js';

const measureText = '00000000000000000000';
const terminalFontFamily = 'MesloLGS Nerd Font Mono';
const terminalFontSize = 12;
const fallbackColor = '#E1E1E1';
const defaultRenderer = 'html';

injectGlobal({
  '@font-face': {
    fontFamily: terminalFontFamily,
    src: 'url("/fonts/MesloLGSNerdFontMono-Regular.ttf") format("truetype")',
    fontDisplay: 'block',
    fontStyle: 'normal',
    fontWeight: 400,
  },
});

const toCellCount = (value) => {
  if (value == null) {
    return undefined;
  }

  const count = Number(value);

  if (!Number.isFinite(count)) {
    return undefined;
  }

  return Math.max(0, Math.floor(count));
};

const getRowCells = (surface, y) => {
  const cells = [];
  const rowStart = surface.width * y;
  const rowEnd = rowStart + surface.width;

  for (let index = rowStart; index < rowEnd; index += 1) {
    cells.push(surface.cells[index]);
  }

  return cells;
};

const drawCanvas = (element, surface, terminal) => {
  const context = element.getContext('2d');
  const ratio = window.devicePixelRatio || 1;

  element.width = Math.ceil(terminal.pixelWidth * ratio);
  element.height = Math.ceil(terminal.pixelHeight * ratio);

  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, terminal.pixelWidth, terminal.pixelHeight);
  context.font = `400 ${terminal.fontSize}px "${terminal.fontFamily}", monospace`;
  context.textAlign = 'left';
  context.textBaseline = 'top';

  const verticalOffset = Math.max(0, (terminal.cellHeight - terminal.fontSize) / 2);

  for (let y = 0; y < surface.height; y += 1) {
    for (let x = 0; x < surface.width; x += 1) {
      const cell = surface.cells[(surface.width * y) + x];

      if (cell.contents === ' ') {
        continue;
      }

      context.fillStyle = cell.color ?? fallbackColor;
      context.fillText(
        cell.contents,
        x * terminal.cellWidth,
        (y * terminal.cellHeight) + verticalOffset
      );
    }
  }
};

const HtmlRenderer = (props) => {
  return Array.from({length: props.surface.height}, (_, y) => (
    <span key={y} className="terminal-row">
      {getRowCells(props.surface, y).map((cell, index) => (
        <span key={index} className="terminal-cell" style={{color: cell.color}}>
          {cell.contents}
        </span>
      ))}
    </span>
  ));
};

const CanvasRenderer = (props) => {
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    drawCanvas(canvasRef.current, props.surface, props.terminal);
  }, [props.surface, props.terminal]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        display: 'block',
        width: `${props.terminal.pixelWidth}px`,
        height: `${props.terminal.pixelHeight}px`,
      }}
    />
  );
};

const styles = {
  terminal: css({
    display: 'block',
    width: '100%',
    height: '100%',
    minHeight: '1lh',
    overflow: 'hidden',
  }),
  pre: css({
    display: 'block',
    position: 'relative',
    margin: 0,
    overflow: 'hidden',
    whiteSpace: 'pre',
    fontFamily: `"${terminalFontFamily}", monospace`,
    fontSize: `${terminalFontSize}px`,
    fontStyle: 'normal',
    fontWeight: 400,
    fontStretch: 'normal',
    fontVariantLigatures: 'none',
    letterSpacing: 0,
    lineHeight: '14px',
    '.terminal-row': {
      display: 'block',
      width: '100%',
      height: 'var(--terminal-cell-height)',
      lineHeight: 'var(--terminal-cell-height)',
    },
    '.terminal-cell': {
      display: 'inline-block',
      width: 'var(--terminal-cell-width)',
      height: 'var(--terminal-cell-height)',
      overflow: 'visible',
      verticalAlign: 'top',
    },
  }),
  measure: css({
    position: 'absolute',
    left: 0,
    top: 0,
    visibility: 'hidden',
    pointerEvents: 'none',
    whiteSpace: 'pre',
  }),
};

const Terminal = (props) => {
  const targetWidth = toCellCount(props.width);
  const targetHeight = toCellCount(props.height);
  const renderer = props.renderer ?? defaultRenderer;
  const terminalRef = useRef(null);
  const measureRef = useRef(null);
  const [fontRevision, setFontRevision] = useState(0);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
    pixelWidth: 0,
    pixelHeight: 0,
  });

  const updateSize = useCallback(() => {
    const terminal = terminalRef.current;
    const measure = measureRef.current;

    if (!terminal || !measure) {
      return;
    }

    const measureRect = measure.getBoundingClientRect();
    const charWidth = measureRect.width / measureText.length;
    const charHeight = measureRect.height;

    if (charWidth <= 0 || charHeight <= 0) {
      return;
    }

    const width = targetWidth ?? Math.max(0, Math.floor(terminal.clientWidth / charWidth));
    const height = targetHeight ?? Math.max(0, Math.floor(terminal.clientHeight / charHeight));
    const pixelWidth = width * charWidth;
    const pixelHeight = height * charHeight;

    setSize((current) => {
      if (
        current.width === width
        && current.height === height
        && current.pixelWidth === pixelWidth
        && current.pixelHeight === pixelHeight
      ) {
        return current;
      }

      return {
        width,
        height,
        pixelWidth,
        pixelHeight,
      };
    });
  }, [targetWidth, targetHeight]);

  const terminalStyle = {};
  const cellWidth = size.width > 0 ? size.pixelWidth / size.width : 0;
  const cellHeight = size.height > 0 ? size.pixelHeight / size.height : 0;

  if (targetWidth != null) {
    terminalStyle.width = `${size.pixelWidth}px`;
  }

  if (targetHeight != null) {
    terminalStyle.height = `${size.pixelHeight}px`;
  }

  const terminal = {
    width: size.width,
    height: size.height,
    pixelWidth: size.pixelWidth,
    pixelHeight: size.pixelHeight,
    cellWidth,
    cellHeight,
    fontFamily: terminalFontFamily,
    fontSize: terminalFontSize,
    fontRevision,
  };

  const renderSurface = (surface) => {
    if (renderer === 'canvas') {
      return <CanvasRenderer surface={surface} terminal={terminal} />;
    }

    return <HtmlRenderer surface={surface} />;
  };

  useLayoutEffect(() => {
    updateSize();

    const terminal = terminalRef.current;

    if (!terminal) {
      return undefined;
    }

    const observer = new ResizeObserver(updateSize);
    observer.observe(terminal);

    let cancelled = false;

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) {
          updateSize();
          setFontRevision((current) => current + 1);
        }
      });
    }

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [updateSize]);

  return (
    <div ref={terminalRef} className={cx(styles.terminal)} style={terminalStyle}>
      <pre
        className={cx(styles.pre)}
        style={{
          width: `${size.pixelWidth}px`,
          height: `${size.pixelHeight}px`,
          '--terminal-cell-width': `${cellWidth}px`,
          '--terminal-cell-height': `${cellHeight}px`,
        }}
      >
        <TerminalContext.Provider
          value={{
            width: size.width,
            height: size.height,
            renderSurface,
          }}
        >
          {size.width > 0 && size.height > 0 && props.children}
        </TerminalContext.Provider>
        <span ref={measureRef} className={cx(styles.measure)} aria-hidden="true">
          {measureText}
        </span>
      </pre>
    </div>
  );
};

export {Terminal};
