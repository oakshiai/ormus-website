import { useState } from 'react'
import { css, cx, tokens } from '../styles'

const codeStyles = {
  // Compact version for use inside headings and body text.
  // Same dark color family as the big version, but with better internal breathing room.
  default: css({
    display: 'inline-flex',
    alignItems: 'center',
    background: '#111113',
    border: `1px solid #27272a`,
    borderRadius: '999px',
    padding: '6px 18px',           // noticeably more room inside (matches the generous feel of the large version)
    fontFamily: tokens.fonts.mono,
    fontSize: '0.78em',
    fontWeight: 500,
    color: '#f4f4f5',
    verticalAlign: 'middle',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  }),

  // Large prominent command bar (when isCopyable)
  pill: css({
    display: 'inline-flex',
    alignItems: 'center',
    background: '#111113',
    border: `1px solid #27272a`,
    borderRadius: '9999px',
    padding: '9px 5px 9px 20px',
    fontFamily: tokens.fonts.mono,
    fontSize: '14px',
    color: '#e5e5e7',
    boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
    maxWidth: '100%',
    overflow: 'hidden',
  }),

  pillContent: css({
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
    minWidth: 0,
    color: '#d1d1d6',
    paddingRight: '4px',
  }),

  pillCopy: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '9999px',
    background: 'transparent',
    border: 'none',
    color: '#a1a1aa',
    cursor: 'pointer',
    flexShrink: 0,
    marginLeft: '2px',
    transition: 'all 0.1s ease',
    '&:hover': {
      color: '#f4f4f5',
      background: '#1f1f22',
    },
  }),
}

export default function Code({ 
  children, 
  isCopyable = false, 
  className 
}) {
  const [copied, setCopied] = useState(false)

  const getTextToCopy = () => {
    if (typeof children === 'string') return children.trim()
    return (children?.toString?.() || '').trim()
  }

  const handleCopy = async () => {
    const text = getTextToCopy()
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    }
  }

  if (isCopyable) {
    return (
      <div className={cx(codeStyles.pill, className)}>
        <div className={codeStyles.pillContent}>
          {children}
        </div>

        <button 
          onClick={handleCopy} 
          className={codeStyles.pillCopy}
          aria-label={copied ? 'Copied' : 'Copy command'}
          title={copied ? 'Copied!' : 'Copy'}
        >
          {copied ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </button>
      </div>
    )
  }

  // Default compact version with better breathing room
  return (
    <span className={cx(codeStyles.default, className)}>
      {children}
    </span>
  )
}
