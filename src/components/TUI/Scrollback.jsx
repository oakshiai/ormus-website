import { css } from '@emotion/css'
import { colors, fonts } from './theme'

const styles = {
  root: css({
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '10px 14px 14px',
    fontFamily: fonts.mono,
    fontSize: '12px',
    lineHeight: 1.35,
    color: colors.text,
    background: colors.bg,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  }),
  userMessage: css({
    background: colors.bgMessage,
    border: `1px solid ${colors.border}`,
    borderRadius: '4px',
    padding: '8px 11px 9px',
    marginBottom: '10px',
    color: colors.text,
    fontSize: '12px',
  }),
  timestamp: css({
    float: 'right',
    fontSize: '10px',
    color: colors.textDim,
    marginLeft: '12px',
    marginTop: '1px',
  }),
  thought: css({
    color: colors.textMuted,
    marginBottom: '2px',
    display: 'flex',
    gap: '6px',
  }),
  diamond: css({
    color: colors.textDim,
    flexShrink: 0,
  }),
  more: css({
    color: colors.textDim,
    margin: '4px 0 6px',
  }),
  toolLine: css({
    color: colors.textMuted,
    marginBottom: '2px',
  }),
  cancelled: css({
    color: colors.textDim,
    fontSize: '11px',
    marginTop: '6px',
  }),
}

function Scrollback({ preset }) {
  if (preset === 'plan-approval') {
    // In approval mode the scrollback is still visible behind the bottom sheet
    // We render a minimal version of the same conversation for visual continuity
    return (
      <div className={styles.root} style={{ paddingBottom: '8px' }}>
        <div className={styles.userMessage}>
          There is no available and open source of the grok build TUI, which is fine, because I can use it and take screenshots.
          <span className={styles.timestamp}>4:48 PM</span>
        </div>
        <div className={styles.more}>+ 6 more</div>
        <div className={styles.thought}>
          <span className={styles.diamond}>◇</span>
          <span>Thought for 0.8s</span>
        </div>
        <div className={styles.thought}>
          <span className={styles.diamond}>◇</span>
          <span>Read src/components/TUI/theme.js</span>
        </div>
      </div>
    )
  }

  // plan-prompt (and default) – faithful recreation of the first screenshot
  return (
    <div className={styles.root}>
      <div className={styles.userMessage}>
        Instead of pixel bitmaps that are lossy, I think I can recreate the look of grok build with React components, given how it's a TUI anyway, the layout is done with characters, right? That way, I could do lossless "screens" and share them on the website, even do it optimized for mobile. Something like a {'<TUI>'} component that displays the discreet parts of the grok build UI. Would you need screenshots of various grok build states while in operation to proceed?
        <span className={styles.timestamp}>4:45 PM</span>
      </div>

      <div className={styles.more}>+ 11 more</div>

      <div className={styles.thought}>
        <span className={styles.diamond}>◇</span>
        <span>Thought for 2.7s</span>
      </div>
      <div className={styles.thought}>
        <span className={styles.diamond}>◇</span>
        <span>Read /Users/replicant/.grok/docs/user-guide/plan-mode.md</span>
      </div>
      <div className={styles.thought}>
        <span className={styles.diamond}>◇</span>
        <span>List /Users/replicant/.grok/docs/user-guide</span>
      </div>
      <div className={styles.thought}>
        <span className={styles.diamond}>◇</span>
        <span>Read content/01-getting-started.md (101-200 of 248)</span>
      </div>
      <div className={styles.thought}>
        <span className={styles.diamond}>◇</span>
        <span>Thought for 0.8s</span>
      </div>
      <div className={styles.thought}>
        <span className={styles.diamond}>◇</span>
        <span>Read content/19-plan-mode.md (101-200 of 248)</span>
      </div>
      <div className={styles.thought}>
        <span className={styles.diamond}>◇</span>
        <span>Thought for 1.3s</span>
      </div>

      <div className={styles.toolLine}>
        <span style={{ color: colors.red }}>│</span> Run file /Users/replicant/Projects/grok/website/public/images/grok-build-terminal.jpg
      </div>

      <div className={styles.cancelled}>Turn cancelled by user in 2s</div>
    </div>
  )
}

export { Scrollback }
