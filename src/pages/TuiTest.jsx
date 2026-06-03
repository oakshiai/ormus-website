import {css} from '@emotion/css'

import {Terminal} from '../components/Terminal/Terminal.jsx'
import {Grok} from '../components/Terminal/Grok/Grok.jsx'

const styles = {
  root: css({
    minHeight: '100vh',
    background: '#0a0a0c',
    padding: '40px 20px 60px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  }),
  container: css({
    width: '100%',
    maxWidth: '1200px',
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
    background: '#000000',
    borderRadius: '6px',
    border: '1px solid #1f1f23',
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

function TuiTest() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>TUI Visual Tests</div>
        </div>

        <section className={styles.section}>
          <Terminal width={140} height={40}>
            <Grok
              branch="trunk"
              cwd="~/Projects/grok/website/"
              thread={[]}
              tip="Press Ctrl+G to background a running terminal command."
              model="Grok Build"
              mode="always-approve"
              release={{
                version: '0.2.16',
                channel: 'stable',
                label: 'Beta'
              }}
            />
          </Terminal>
        </section>
      </div>
    </div>
  )
}

export { TuiTest }
