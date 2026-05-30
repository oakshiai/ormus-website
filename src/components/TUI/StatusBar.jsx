import { css } from '@emotion/css'
import { colors, fonts } from './theme'

const styles = {
  bar: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '4px 12px 5px',
    fontFamily: fonts.mono,
    fontSize: '10px',
    color: colors.textDim,
    background: colors.bg,
    borderTop: `1px solid ${colors.border}`,
    userSelect: 'none',
    whiteSpace: 'nowrap',
  }),
  left: css({
    display: 'flex',
    gap: '10px',
  }),
  right: css({
    color: colors.textMuted,
  }),
}

function StatusBar({ left, right }) {
  return (
    <div className={styles.bar}>
      <div className={styles.left}>{left}</div>
      <div className={styles.right}>{right}</div>
    </div>
  )
}

export { StatusBar }
