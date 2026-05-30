import { css } from '@emotion/css'
import { colors, fonts } from './theme'

const styles = {
  wrapper: css({
    padding: '0 10px 8px',
    background: colors.bg,
  }),
  inputArea: css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    background: colors.bgPrompt,
    border: `1px solid ${colors.borderPrompt}`,
    borderRadius: '4px',
    padding: '7px 11px 8px',
    fontFamily: fonts.mono,
    fontSize: '12px',
    color: colors.text,
    minHeight: '28px',
  }),
  promptSymbol: css({
    color: colors.textDim,
    marginRight: '6px',
    flexShrink: 0,
  }),
  promptText: css({
    flex: 1,
    minWidth: 0,
    paddingRight: '6ch', // reserve space so long text doesn't overlap the overlay
  }),
  rightLabelOverlay: css({
    position: 'absolute',
    right: '2ch',
    bottom: '-1px',
    transform: 'translateY(-50%)', // center the label's vertical midpoint on the bottom border line
    display: 'flex',
    alignItems: 'center',
    color: colors.textMuted,
    fontSize: '11px',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    userSelect: 'none',
    backgroundColor: colors.bgPrompt, // covers/interrupts the bottom border
    padding: '0 5px',
  }),

  // Expanded approval / choice mode (plan exit dialog)
  choiceWrapper: css({
    background: colors.bgPrompt,
    border: `1px solid ${colors.borderPrompt}`,
    borderRadius: '6px',
    padding: '4px 0',
    fontFamily: fonts.mono,
    fontSize: '12px',
  }),
  choice: css({
    display: 'flex',
    alignItems: 'flex-start',
    padding: '6px 12px',
    gap: '8px',
    color: colors.text,
  }),
  choiceActive: css({
    background: '#1f1f23',
  }),
  choiceNum: css({
    color: colors.green,
    fontWeight: 600,
    width: '14px',
    flexShrink: 0,
  }),
  choiceText: css({
    color: colors.text,
    lineHeight: 1.3,
  }),
}

function PromptBar({ mode = 'normal', value, selected = 1, rightLabel }) {
  if (mode === 'approval') {
    const options = [
      { num: 1, label: 'Yes, and don\'t ask again for anything (always-approve mode)' },
      { num: 2, label: 'Always allow (YOLO)' },
      { num: 3, label: 'Yes' },
      { num: 4, label: 'No, revise the plan (type feedback)' },
    ]

    return (
      <div className={styles.wrapper}>
        <div className={styles.choiceWrapper}>
          {options.map((opt) => (
            <div
              key={opt.num}
              className={css(styles.choice, opt.num === selected && styles.choiceActive)}
            >
              <span className={styles.choiceNum}>{opt.num}</span>
              <span className={styles.choiceText}>{opt.label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Normal prompt bar
  const label = rightLabel || 'Grok Build · plan'

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputArea}>
        <span className={styles.promptSymbol}>›</span>
        <span className={styles.promptText}>
          {value || 'There is no available and open source of the grok build TUI, which is fine, because I can use it and take screenshots.'}
        </span>

        {/* Overlay label sitting on the bottom-right, inside the border */}
        <div className={styles.rightLabelOverlay}>{label}</div>
      </div>
    </div>
  )
}

export { PromptBar }
