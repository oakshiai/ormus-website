import { css } from '@emotion/css'
import { colors, fonts } from './theme'

const styles = {
  bar: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '3px 12px',
    fontFamily: fonts.mono,
    fontSize: '10.5px',
    color: colors.textMuted,
    background: colors.bg,
    borderBottom: `1px solid ${colors.border}`,
    userSelect: 'none',
    lineHeight: 1,
    minHeight: '26px',
  }),
  left: css({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: colors.textMuted,
  }),
  statusBadge: css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '15px',
    height: '15px',
    borderRadius: '3px',
    background: '#1e2937',
    color: '#7aa0d9',
    fontSize: '10px',
    fontWeight: 700,
    flexShrink: 0,
  }),
  branch: css({
    color: '#a5b4fc',
    fontWeight: 500,
  }),
  cwd: css({
    color: colors.textMuted,
    opacity: 0.85,
  }),
  right: css({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '10.5px',
  }),
  context: css({
    color: colors.textMuted,
    letterSpacing: '0.3px',
  }),
  sep: css({
    color: colors.textDim,
    opacity: 0.55,
    padding: '0 1px',
    userSelect: 'none',
  }),
  prompts: css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px',
    color: colors.textMuted,
  }),
  check: css({
    color: '#4ade80',
    fontWeight: 700,
    fontSize: '11px',
    lineHeight: 1,
  }),
}

function TopBar({
  branch = 'trunk',
  cwd = '~/Projects/grok/website',
  context = '84K / 512K',
  prompts = '7',
  complete = true,
}) {
  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <div className={styles.statusBadge}>?</div>
        <span className={styles.branch}>{branch}</span>
        <span className={styles.cwd}>{cwd}</span>
      </div>

      <div className={styles.right}>
        <span className={styles.context}>{context}</span>
        <span className={styles.sep}>|</span>
        <span className={styles.prompts}>
          {prompts}
          {complete && <span className={styles.check}>✓</span>}
        </span>
      </div>
    </div>
  )
}

export { TopBar }
