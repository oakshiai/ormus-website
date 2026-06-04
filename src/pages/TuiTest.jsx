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

const release = {
  version: '0.2.22',
  channel: 'stable',
  label: 'Beta',
}

const sendShortcuts = [
  {keys: 'Enter', effect: 'send'},
  {keys: 'Shift+Tab', effect: 'mode'},
  {keys: 'Ctrl+.', effect: 'shortcuts'},
]

const baseProps = {
  branch: 'trunk',
  cwd: '~/Projects/grok/recorder/',
  model: 'Grok Build',
  mode: 'always-approve',
  thread: [],
}

const chapters = [
  {
    title: 'Main Menu',
    file: '0001-main-menu.txt',
    props: {
      release,
      tip: 'Press Ctrl+O to toggle auto-approve mode.',
    },
  },
  {
    title: 'Changelog',
    file: '0002-changelog.txt',
    props: {
      release,
      tip: 'Press Ctrl+O to toggle auto-approve mode.',
      changelog: {
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
      },
    },
  },
  {
    title: 'Starting Session',
    file: '0003-starting-session.txt',
    props: {
      cwd: '~/Projects/grok/recorder',
      prompt: 't',
      suggestedShortcuts: sendShortcuts,
      indicator: {
        text: 'Starting session…',
        elapsed: '0.0s',
      },
    },
  },
  {
    title: 'Message Input',
    file: '0004-message-input.txt',
    props: {
      cwd: '~/Projects/grok/recorder',
      prompt: 'test',
      suggestedShortcuts: sendShortcuts,
    },
  },
  {
    title: 'Message Input with Quit Hint',
    file: '0005-message-input-with-quit-hint.txt',
    props: {
      context: {
        used: '4.6K',
        remaining: '512K',
      },
      prompt: 'test',
      suggestedShortcuts: [
        {keys: 'Ctrl+d', effect: 'press again to quit'},
      ],
    },
  },
]

function TuiTest() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>TUI Visual Tests</div>
        </div>

        {chapters.map((chapter) => (
          <section key={chapter.file} className={styles.section}>
            <div className={styles.label}>{chapter.title}</div>
            <Terminal width={140} height={40}>
              <Grok
                {...baseProps}
                {...chapter.props}
                chapter={chapter}
              />
            </Terminal>
          </section>
        ))}
      </div>
    </div>
  )
}

export { TuiTest }
