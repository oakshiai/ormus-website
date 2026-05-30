import { css, cx, tokens } from '../styles'

const keyboardStyles = {
  // Individual keycap
  key: css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '26px',
    height: '26px',
    padding: '0 7px',
    fontFamily: tokens.fonts.sans,
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '-0.2px',
    color: '#f4f4f5',
    background: 'linear-gradient(180deg, #27272a 0%, #1a1a1e 100%)',
    border: '1px solid #3a3a40',
    borderRadius: '5px',
    boxShadow: `
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      inset 0 -1px 0 rgba(0, 0, 0, 0.6),
      0 1px 2px rgba(0, 0, 0, 0.35)
    `,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    transition: 'transform 0.08s ease, box-shadow 0.08s ease',
    '&:hover': {
      boxShadow: `
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        inset 0 -1px 0 rgba(0, 0, 0, 0.65),
        0 2px 4px rgba(0, 0, 0, 0.4)
      `,
    },
    '&:active': {
      transform: 'translateY(1px)',
      boxShadow: `
        inset 0 1px 0 rgba(255, 255, 255, 0.06),
        inset 0 -1px 0 rgba(0, 0, 0, 0.7),
        0 1px 1px rgba(0, 0, 0, 0.3)
      `,
    },
  }),

  // Smaller variant for compact use (tables, inline)
  keySm: css({
    minWidth: '20px',
    height: '20px',
    padding: '0 5px',
    fontSize: '10.5px',
    borderRadius: '4px',
  }),

  // Larger variant for prominent display
  keyLg: css({
    minWidth: '32px',
    height: '32px',
    padding: '0 10px',
    fontSize: '14px',
    borderRadius: '6px',
    boxShadow: `
      inset 0 1.5px 0 rgba(255, 255, 255, 0.09),
      inset 0 -1px 0 rgba(0, 0, 0, 0.65),
      0 2px 4px rgba(0, 0, 0, 0.4)
    `,
  }),

  // Special styling for single-character keys (letters, arrows, symbols)
  keySingle: css({
    fontWeight: 700,
    letterSpacing: '0',
    padding: '0 5px',
  }),

  // Combo container (Ctrl + K)
  combo: css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
  }),

  comboLg: css({
    gap: '7px',
  }),

  // Plus separator (normal context)
  sep: css({
    color: tokens.colors.textMuted,
    fontSize: '12px',
    fontWeight: 400,
    userSelect: 'none',
    padding: '0 1px',
  }),

  sepLg: css({
    fontSize: '15px',
    padding: '0 2px',
  }),

  // High-contrast keycap for dark overlays / screenshots (much brighter)
  keyHigh: css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '28px',
    height: '28px',
    padding: '0 8px',
    fontFamily: tokens.fonts.sans,
    fontSize: '12.5px',
    fontWeight: 700,
    letterSpacing: '-0.1px',
    color: '#ffffff',
    background: 'linear-gradient(180deg, #3a3a42 0%, #242429 100%)',
    border: '1px solid #4a4a52',
    borderRadius: '6px',
    boxShadow: `
      inset 0 1px 0 rgba(255, 255, 255, 0.18),
      inset 0 -1px 0 rgba(0, 0, 0, 0.5),
      0 2px 4px rgba(0, 0, 0, 0.5)
    `,
    whiteSpace: 'nowrap',
    userSelect: 'none',
  }),

  keyHighSm: css({
    minWidth: '22px',
    height: '22px',
    padding: '0 6px',
    fontSize: '11px',
    borderRadius: '5px',
  }),

  keyHighLg: css({
    minWidth: '34px',
    height: '34px',
    padding: '0 11px',
    fontSize: '15px',
    borderRadius: '7px',
  }),

  // High-contrast separator for dark overlays
  sepHigh: css({
    color: 'rgba(255,255,255,0.55)',
    fontSize: '13px',
    fontWeight: 400,
    userSelect: 'none',
    padding: '0 3px',
  }),

  sepHighLg: css({
    fontSize: '16px',
    padding: '0 5px',
  }),

  // Full overlay card
  overlay: css({
    background: tokens.colors.cardBg,
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radii.lg,
    overflow: 'hidden',
    boxShadow: tokens.colors.shadow,
  }),

  overlayHeader: css({
    padding: '14px 18px 12px',
    borderBottom: `1px solid ${tokens.colors.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    flexWrap: 'wrap',
  }),

  action: css({
    fontSize: '14px',
    fontWeight: 600,
    color: tokens.colors.textHeading,
    letterSpacing: '-0.2px',
  }),

  keysInHeader: css({
    display: 'flex',
    alignItems: 'center',
  }),

  terminalWrap: css({
    position: 'relative',
    background: '#0a0a0c',
    overflow: 'hidden',
  }),

  // macOS-style window frame
  terminalFrame: css({
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255,255,255,0.04)',
    background: '#111113',
  }),

  // Traffic light dots
  titleBar: css({
    height: '28px',
    background: 'linear-gradient(180deg, #1f1f23 0%, #18181b 100%)',
    borderBottom: '1px solid #27272a',
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px',
    gap: '6px',
  }),

  dot: css({
    width: '11px',
    height: '11px',
    borderRadius: '999px',
    border: '1px solid rgba(0,0,0,0.2)',
  }),

  dotRed: css({ background: '#ff5f57' }),
  dotYellow: css({ background: '#febc2e' }),
  dotGreen: css({ background: '#28c840' }),

  titleText: css({
    flex: 1,
    textAlign: 'center',
    fontSize: '11px',
    fontFamily: tokens.fonts.mono,
    color: '#8a8496',
    letterSpacing: '0.2px',
  }),

  screenshot: css({
    display: 'block',
    width: '100%',
    height: 'auto',
    userSelect: 'none',
    pointerEvents: 'none',
  }),

  // Floating key visualization overlaid on the terminal (high legibility)
  floatingKeys: css({
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 10,
    background: 'rgba(12, 12, 14, 0.88)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: '999px',
    padding: '8px 16px',
    backdropFilter: 'blur(16px)',
    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  }),

  floatingKeysLg: css({
    top: '28px',
    right: '28px',
    padding: '10px 22px',
    gap: '5px',
  }),

  // Description below the visual
  description: css({
    padding: '14px 18px 18px',
    fontSize: '13px',
    color: tokens.colors.textMuted,
    lineHeight: 1.5,
    borderTop: `1px solid ${tokens.colors.border}`,
  }),

  // Simple inline usage for docs/tables
  inline: css({
    display: 'inline-flex',
    alignItems: 'center',
    verticalAlign: 'middle',
  }),
}

// Helper to decide if a key label is "single char" (bigger, bolder treatment)
function isSingleCharKey(label) {
  if (typeof label !== 'string') return false
  const trimmed = label.trim()
  // Single letters, arrows, symbols, numbers, etc.
  return trimmed.length === 1 || /^[⇧⌘⌥⇧↵←→↑↓]$/.test(trimmed)
}

function getKeyClassName(label, size, variant) {
  const isHigh = variant === 'high'
  const base = isHigh ? keyboardStyles.keyHigh : keyboardStyles.key
  const sizeClass = size === 'sm'
    ? (isHigh ? keyboardStyles.keyHighSm : keyboardStyles.keySm)
    : size === 'lg'
      ? (isHigh ? keyboardStyles.keyHighLg : keyboardStyles.keyLg)
      : null
  const singleClass = isSingleCharKey(label) ? keyboardStyles.keySingle : null
  return cx(base, sizeClass, singleClass)
}

function Key({ children, size, variant, className, ...rest }) {
  const content = children
  const keyClass = getKeyClassName(content, size, variant)

  return (
    <kbd className={cx(keyClass, className)} {...rest}>
      {content}
    </kbd>
  )
}

function KeyCombo({ keys, size = 'md', variant, className }) {
  if (!keys || keys.length === 0) return null

  const isLg = size === 'lg'
  const isHigh = variant === 'high'
  const comboClass = cx(keyboardStyles.combo, isLg && keyboardStyles.comboLg, className)
  const sepClass = isHigh
    ? cx(keyboardStyles.sepHigh, isLg && keyboardStyles.sepHighLg)
    : cx(keyboardStyles.sep, isLg && keyboardStyles.sepLg)

  const keySize = size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : undefined

  return (
    <span className={comboClass}>
      {keys.map((k, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
          {i > 0 && <span className={sepClass}>+</span>}
          <Key size={keySize} variant={variant}>{k}</Key>
        </span>
      ))}
    </span>
  )
}

// A compact, attractive terminal mock used when no screenshot is provided
function TerminalMock() {
  const mockStyles = {
    root: css({
      padding: '14px 16px 18px',
      fontFamily: tokens.fonts.mono,
      fontSize: '12px',
      lineHeight: 1.5,
      color: '#d1d1d6',
      background: '#0d0d0f',
    }),
    line: css({ marginBottom: '3px' }),
    user: css({ color: '#f4f4f5', fontWeight: 500 }),
    assistant: css({ color: '#c4c4c8' }),
    prompt: css({
      color: '#6b4eff',
      marginRight: '6px',
    }),
    caret: css({
      display: 'inline-block',
      width: '6px',
      height: '15px',
      background: '#6b4eff',
      verticalAlign: 'middle',
      marginLeft: '2px',
      borderRadius: '1px',
      boxShadow: '0 0 0 2px rgba(107, 78, 255, 0.25)',
    }),
    dim: css({ color: '#6b6675' }),
  }

  return (
    <div className={mockStyles.root}>
      <div className={mockStyles.line}>
        <span className={mockStyles.dim}>$</span> grok build
      </div>
      <div className={mockStyles.line} style={{ marginTop: '8px' }}>
        <span className={mockStyles.user}>You:</span> Refactor the auth module to use the new session store
      </div>
      <div className={mockStyles.line} style={{ marginTop: '6px' }}>
        <span className={mockStyles.assistant}>Grok:</span> I'll start by exploring the current auth implementation...
      </div>
      <div className={mockStyles.line} style={{ color: '#8a8496', fontSize: '11px' }}>
        ◇ Thinking · 1.2s
      </div>
      <div className={mockStyles.line} style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
        <span className={mockStyles.prompt}>▶</span>
        <span style={{ color: '#a1a1aa' }}>Type a message or / for commands</span>
        <span className={mockStyles.caret} />
      </div>
      <div style={{ marginTop: '12px', borderTop: '1px solid #222226', paddingTop: '7px', fontSize: '10px', color: '#55555a' }}>
        Ctrl+P palette · Ctrl+T todos · Esc scrollback
      </div>
    </div>
  )
}

function ShortcutOverlay({
  action,
  combo,
  description,
  screenshot,
  framed = false,
  size = 'md',
  floatingKeys = true,
  overlayPosition = 'top-right',
  className,
  children,
}) {
  const isLg = size === 'lg'
  const floatClass = cx(keyboardStyles.floatingKeys, isLg && keyboardStyles.floatingKeysLg)

  // Minimal visual content - just the image or children or mock
  const visualContent = screenshot ? (
    <img
      src={screenshot}
      alt={action ? `${action} in Grok Build TUI` : 'Grok Build terminal'}
      className={keyboardStyles.screenshot}
    />
  ) : children ? (
    <div style={{ background: '#0d0d0f' }}>{children}</div>
  ) : (
    <TerminalMock />
  )

  // Only wrap with macOS frame if explicitly requested
  const terminalArea = framed ? (
    <div className={keyboardStyles.terminalFrame}>
      <div className={keyboardStyles.titleBar}>
        <div className={cx(keyboardStyles.dot, keyboardStyles.dotRed)} />
        <div className={cx(keyboardStyles.dot, keyboardStyles.dotYellow)} />
        <div className={cx(keyboardStyles.dot, keyboardStyles.dotGreen)} />
        <div className={keyboardStyles.titleText}>grok build — my-project</div>
      </div>
      {visualContent}
    </div>
  ) : (
    <div
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        border: '1px solid #222226',
      }}
    >
      {visualContent}
    </div>
  )

  // Dynamic position for the floating pill (only non-default positions need overrides)
  const getOverlayStyle = () => {
    if (overlayPosition === 'top-center') {
      return { top: isLg ? 28 : 20, left: '50%', right: 'auto', transform: 'translateX(-50%)' }
    }
    if (overlayPosition === 'bottom-center') {
      return { top: 'auto', bottom: isLg ? 28 : 20, left: '50%', right: 'auto', transform: 'translateX(-50%)' }
    }
    return {} // top-right is the default in the CSS
  }

  const overlayStyle = getOverlayStyle()

  return (
    <div className={cx(keyboardStyles.overlay, className)}>
      {/* Very light optional header - only shown in non-screenshot rich card usage */}
      {action && !screenshot && (
        <div className={keyboardStyles.overlayHeader}>
          <div className={keyboardStyles.action}>{action}</div>
          {combo && (
            <div className={keyboardStyles.keysInHeader}>
              <KeyCombo keys={combo} size={isLg ? 'lg' : 'md'} />
            </div>
          )}
        </div>
      )}

      {/* Main visual area */}
      <div className={keyboardStyles.terminalWrap} style={{ position: 'relative' }}>
        {terminalArea}

        {/* High-contrast floating key overlay badge */}
        {floatingKeys && combo && (
          <div className={floatClass} style={overlayStyle}>
            <KeyCombo keys={combo} size={isLg ? 'lg' : 'md'} variant="high" />
          </div>
        )}
      </div>

      {/* Optional description footer */}
      {description && (
        <div className={keyboardStyles.description}>{description}</div>
      )}
    </div>
  )
}

export { Key, KeyCombo, ShortcutOverlay, TerminalMock }
