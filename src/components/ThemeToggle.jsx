import { useState, useEffect } from 'react'
import { css, tokens } from '../styles'

const toggleStyles = {
  button: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: tokens.radii.md,
    border: 'none',
    background: 'transparent',
    color: tokens.colors.text,
    cursor: 'pointer',
    transition: 'all 0.1s ease',
    '&:hover': {
      background: tokens.colors.bgAlt,
      color: tokens.colors.textHeading,
    },
  }),
  icon: css({
    width: '18px',
    height: '18px',
  }),
}

function getEffectiveTheme() {
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(mode) {
  const root = document.documentElement
  if (mode === 'light' || mode === 'dark') {
    root.setAttribute('data-theme', mode)
    try {
      localStorage.setItem('theme', mode)
    } catch {}
  } else {
    // system: remove override so media query takes over
    root.removeAttribute('data-theme')
    try {
      localStorage.removeItem('theme')
    } catch {}
  }
}

export default function ThemeToggle({ onToggle }) {
  const [effective, setEffective] = useState('light')

  // Initialize and keep in sync
  useEffect(() => {
    const update = () => setEffective(getEffectiveTheme())
    update()

    // Listen to system changes (only matters when no explicit saved)
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const saved = localStorage.getItem('theme')
      if (!saved) {
        update()
      }
    }
    media.addEventListener?.('change', handleChange)
    return () => media.removeEventListener?.('change', handleChange)
  }, [])

  const toggle = () => {
    const next = effective === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setEffective(next)
    onToggle?.()
  }

  const isDark = effective === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      className={toggleStyles.button}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? (
        // Sun icon
        <svg
          className={toggleStyles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        // Moon icon
        <svg
          className={toggleStyles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
