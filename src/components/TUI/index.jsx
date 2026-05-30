import { css } from '@emotion/css'
import { colors, fonts } from './theme'
import { TopBar } from './TopBar'
import { Scrollback } from './Scrollback'
import { PromptBar } from './PromptBar'
import { StatusBar } from './StatusBar'

const styles = {
  frame: css({
    background: colors.bg,
    border: `1px solid ${colors.border}`,
    borderRadius: '6px',
    overflow: 'hidden',
    fontFamily: fonts.mono,
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    // Give the embedded TUI a realistic minimum height so the scrollback area breathes
    minHeight: '380px',
  }),
  // The inner surface is deliberately flat – no extra shadows or elevation
}

function TUI({ preset = 'plan-prompt' }) {
  if (preset === 'plan-approval') {
    return (
      <div className={styles.frame}>
        <TopBar
          branch="trunk"
          cwd="~/Projects/grok/website"
          context="52K / 512K"
          prompts="6"
          complete={true}
        />
        <Scrollback preset="plan-approval" />
        <PromptBar mode="approval" selected={1} />
        <StatusBar
          left="1/4 :select  |  ←/→:scope  |  Ctrl+↑:yolo  |  Ctrl+↓:cancel"
          right=""
        />
      </div>
    )
  }

  // Default / plan-prompt preset – matches the reference screenshots
  return (
    <div className={styles.frame}>
      <TopBar
        branch="trunk"
        cwd="~/Projects/grok/website"
        context="84K / 512K"
        prompts="7"
        complete={true}
      />
      <Scrollback preset="plan-prompt" />
      <PromptBar
        mode="normal"
        value="There is no available and open source of the grok build TUI, which is fine, because I can use it and take screenshots."
      />
      <StatusBar
        left="Enter:send  |  Shift+Tab:mode  |  Ctrl+↑:shortcuts"
        right="Grok Build · plan"
      />
    </div>
  )
}

export { TUI }
