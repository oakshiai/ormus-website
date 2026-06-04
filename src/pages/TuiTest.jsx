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
          <div className={styles.label}>Main Menu</div>
          <Terminal width={140} height={40} renderer="html">
            <Grok
              branch="trunk"
              cwd="~/Projects/grok/recorder/"
              model="Grok Build"
              mode="always-approve"
              thread={[]}
              release={{
                version: '0.2.22',
                channel: 'stable',
                label: 'Beta',
              }}
              tip="Press Ctrl+O to toggle auto-approve mode."
            />
          </Terminal>
        </section>

        <section className={styles.section}>
          <div className={styles.label}>Changelog</div>
          <Terminal width={140} height={40} renderer="html">
            <Grok
              branch="trunk"
              cwd="~/Projects/grok/recorder/"
              model="Grok Build"
              mode="always-approve"
              thread={[]}
              release={{
                version: '0.2.22',
                channel: 'stable',
                label: 'Beta',
              }}
              tip="Press Ctrl+O to toggle auto-approve mode."
              changelog={{
                title: 'Changelog',
                action: {
                  label: 'See all',
                  keys: 'ctrl-l',
                },
                items: [
                  'Authentication errors with static API keys now surface a clear error instead of hanging the turn.',
                  'allowed_models in config.toml now restricts which models appear in the picker and /model command.',
                  'Code navigation now returns correct results for secondary project windows with different working directories.',
                ],
              }}
            />
          </Terminal>
        </section>

        <section className={styles.section}>
          <div className={styles.label}>Starting Session</div>
          <Terminal width={140} height={40} renderer="html">
            <Grok
              branch="trunk"
              cwd="~/Projects/grok/recorder"
              model="Grok Build"
              mode="always-approve"
              thread={[]}
              prompt="t"
              suggestedShortcuts={[
                {keys: 'Enter', effect: 'send'},
                {keys: 'Shift+Tab', effect: 'mode'},
                {keys: 'Ctrl+.', effect: 'shortcuts'},
              ]}
              indicator={{
                text: 'Starting session…',
                elapsed: '0.0s',
              }}
            />
          </Terminal>
        </section>

        <section className={styles.section}>
          <div className={styles.label}>Message Input</div>
          <Terminal width={140} height={40} renderer="html">
            <Grok
              branch="trunk"
              cwd="~/Projects/grok/recorder"
              model="Grok Build"
              mode="always-approve"
              thread={[]}
              prompt="test"
              suggestedShortcuts={[
                {keys: 'Enter', effect: 'send'},
                {keys: 'Shift+Tab', effect: 'mode'},
                {keys: 'Ctrl+.', effect: 'shortcuts'},
              ]}
            />
          </Terminal>
        </section>

        <section className={styles.section}>
          <div className={styles.label}>Message Input with Quit Hint</div>
          <Terminal width={140} height={40} renderer="html">
            <Grok
              branch="trunk"
              cwd="~/Projects/grok/recorder/"
              model="Grok Build"
              mode="always-approve"
              thread={[]}
              context={{
                used: '4.6K',
                remaining: '512K',
              }}
              prompt="test"
              suggestedShortcuts={[
                {keys: 'Ctrl+d', effect: 'press again to quit'},
              ]}
            />
          </Terminal>
        </section>
      </div>
    </div>
  )
}

export { TuiTest }
