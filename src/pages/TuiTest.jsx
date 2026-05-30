import { css } from '@emotion/css'
import { TopBar } from '../components/TUI/TopBar'
import { PromptBar } from '../components/TUI/PromptBar'
import { StatusBar } from '../components/TUI/StatusBar'

// Import the reference screenshot directly (Vite will handle the asset)
import alwaysApprovePng from '../../content/screenshots/always-approve-prompt.png'

const styles = {
  root: css({
    minHeight: '100vh',
    background: '#0a0a0c',
    padding: '40px 20px 60px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  }),
  container: css({
    width: '100%',
    padding: '0 20px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
    boxSizing: 'border-box',
  }),
  header: css({
    textAlign: 'center',
    marginBottom: '8px',
  }),
  title: css({
    fontSize: '13px',
    fontWeight: 600,
    color: '#6b7280',
    letterSpacing: '0.5px',
  }),
  section: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }),
  label: css({
    fontSize: '11px',
    fontWeight: 500,
    color: '#6b7280',
    letterSpacing: '0.3px',
    userSelect: 'none',
  }),
  tuiFrame: css({
    background: '#111113',
    borderRadius: '6px',
    border: '1px solid #27272a',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }),
  screenshot: css({
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
    border: '1px solid #27272a',
    background: '#000',
    display: 'block',
  }),
}

// Custom scrollback content that approximates the visible history in the screenshot
function AlwaysApproveScrollback() {
  const s = {
    root: css({
      flex: 1,
      padding: '10px 14px 12px',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      fontSize: '12px',
      lineHeight: 1.32,
      color: '#d1d1d6',
      background: '#0a0a0c',
      whiteSpace: 'pre-wrap',
    }),
    msg: css({
      background: '#1a1a1e',
      border: '1px solid #27272a',
      borderRadius: '3px',
      padding: '6px 9px',
      marginBottom: '8px',
    }),
    thought: css({ color: '#8a8496', margin: '2px 0' }),
    dim: css({ color: '#6b6675' }),
  }

  return (
    <div className={s.root}>
      <div className={s.msg}>
        You forget the "|" pipe characters on the top right
      </div>

      <div className={s.thought}>◇ Thought for 0.8s</div>
      <div className={s.thought}>◇ Read src/components/TUI/TopBar.jsx</div>
      <div className={s.thought}>◇ Thought for 0.5s</div>
      <div className={s.thought}>◇ Run cd /Users/replicant/Projects/grok/website &amp;&amp; npm run build 2&gt;&amp;1 | tail -6</div>

      <div style={{ marginTop: '8px', color: '#8a8496' }}>
        Fixed.
      </div>

      <div className={s.thought} style={{ marginTop: '6px' }}>
        ◇ Thought for 0.3s
      </div>
      <div style={{ color: '#6b6675', marginTop: '4px' }}>
        The right side now renders as:
      </div>
      <div style={{ color: '#a1a1aa', marginLeft: '8px' }}>
        84K / 512K | 7 ✓
      </div>
    </div>
  )
}

function TuiTest() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>TUI Visual Test — always-approve-prompt.png</div>
        </div>

        {/* Live React recreation */}
        <div className={styles.section}>
          <div className={styles.label}>React recreation (trying to match screenshot exactly)</div>
          <div className={styles.tuiFrame}>
            <TopBar
              branch="trunk"
              cwd="~/Projects/grok/website"
              context="95K / 512K"
              prompts="7"
              complete
            />
            <AlwaysApproveScrollback />
            <PromptBar
              mode="normal"
              value="Build a new route for specifically testing <TUI>, that route should display none of the website chrome, or navigation and just the <TUI> and a screenshot of the real grok build TUI. They should be laid out in a column layout. Use the @content/screenshots/always-approve-prompt.png for the screenshot"
              rightLabel="Grok Build · always-approve"
            />
            <StatusBar
              left="Enter:send | Shift+Tab:mode | Ctrl+↑:plan | Ctrl+↓:shortcuts"
              right=""
            />
          </div>
        </div>

        {/* Real reference screenshot */}
        <div className={styles.section}>
          <div className={styles.label}>Reference: content/screenshots/always-approve-prompt.png</div>
          <img
            src={alwaysApprovePng}
            alt="Real Grok Build TUI - always-approve prompt state"
            className={styles.screenshot}
          />
        </div>
      </div>
    </div>
  )
}

export { TuiTest }
