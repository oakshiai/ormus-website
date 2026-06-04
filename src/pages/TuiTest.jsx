import {Component, useCallback, useEffect, useState} from 'react'
import {css} from '@emotion/css'

import {Terminal} from '../components/Terminal/Terminal.jsx'
import {Grok} from '../components/Terminal/Grok/Grok.jsx'

const styles = {
  root: css({
    minHeight: '100vh',
    background: '#0a0a0c',
    padding: '40px 20px 60px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    boxSizing: 'border-box',
    '@media (max-width: 640px)': {
      padding: '32px 0 60px',
    },
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
    '@media (max-width: 640px)': {
      padding: '0',
      maxWidth: 'none',
    },
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
    '@media (max-width: 640px)': {
      width: '100vw',
    },
  }),
  labelRow: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    '@media (max-width: 640px)': {
      padding: '0 12px',
      boxSizing: 'border-box',
    },
  }),
  label: css({
    fontSize: '11px',
    fontWeight: 500,
    color: '#6b7280',
    letterSpacing: '0.3px',
    userSelect: 'none',
  }),
  size: css({
    fontSize: '11px',
    fontWeight: 500,
    color: '#a1a1aa',
    fontVariantNumeric: 'tabular-nums',
    letterSpacing: '0.2px',
    userSelect: 'text',
  }),
  error: css({
    height: '100%',
    minHeight: '120px',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #3f1f23',
    background: '#12090b',
    color: '#fca5a5',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: '11px',
    lineHeight: 1.5,
    boxSizing: 'border-box',
    whiteSpace: 'pre-wrap',
    width: '100%',
    '@media (max-width: 640px)': {
      borderRadius: 0,
      borderRight: 0,
      borderLeft: 0,
    },
  }),
  previewSurface: css({
    width: '100%',
    '@media (max-width: 640px)': {
      height: 'calc(100dvh - 72px - env(safe-area-inset-bottom, 0px))',
      minHeight: '240px',
    },
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

function useMobileTerminalSizing() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 640px)')
    const update = () => {
      setIsMobile(query.matches)
    }

    update()
    query.addEventListener('change', update)

    return () => {
      query.removeEventListener('change', update)
    }
  }, [])

  return isMobile
}

class TerminalErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
    }
  }

  static getDerivedStateFromError(error) {
    return {
      error,
    }
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({
        error: null,
      })
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className={styles.error}>
          {this.state.error.message}
        </div>
      )
    }

    return this.props.children
  }
}

function TerminalPreview(props) {
  const [size, setSize] = useState(null)
  const isMobile = useMobileTerminalSizing()
  const handleSizeChange = useCallback((nextSize) => {
    setSize({
      width: nextSize.width,
      height: nextSize.height,
    })
  }, [])
  const sizeText = size ? `${size.width} cols x ${size.height} rows` : 'measuring'

  return (
    <section className={styles.section}>
      <div className={styles.labelRow}>
        <div className={styles.label}>{props.label}</div>
        <div className={styles.size}>{sizeText}</div>
      </div>
      <div className={styles.previewSurface}>
        <TerminalErrorBoundary resetKey={`${sizeText}:${isMobile ? 'mobile' : 'desktop'}`}>
          <Terminal height={isMobile ? undefined : 40} renderer="html" onSizeChange={handleSizeChange}>
            {props.children}
          </Terminal>
        </TerminalErrorBoundary>
      </div>
    </section>
  )
}

function TuiTest() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>TUI Visual Tests</div>
        </div>

        <TerminalPreview label="Main Menu">
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
        </TerminalPreview>

        <TerminalPreview label="Changelog">
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
        </TerminalPreview>

        <TerminalPreview label="Starting Session">
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
        </TerminalPreview>

        <TerminalPreview label="Message Input">
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
        </TerminalPreview>

        <TerminalPreview label="Message Input with Quit Hint">
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
        </TerminalPreview>
      </div>
    </div>
  )
}

export { TuiTest }
