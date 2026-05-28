import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { css, cx, tokens } from '../styles'

const headerStyles = {
  header: css({
    position: 'sticky',
    top: 0,
    zIndex: 200,
    background: tokens.colors.bg,
    borderBottom: `1px solid ${tokens.colors.border}`,
  }),
  inner: css({
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 16px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '@media (min-width: 768px)': {
      padding: '0 24px',
      height: '64px',
    },
  }),
  logo: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '18px',
    fontWeight: 700,
    color: tokens.colors.textHeading,
    textDecoration: 'none',
    letterSpacing: '-0.3px',
    '&:hover': {
      color: tokens.colors.accent,
    },
    '@media (min-width: 768px)': {
      fontSize: '20px',
      gap: '10px',
    },
  }),
  logoMark: css({
    width: '26px',
    height: '26px',
    background: tokens.colors.accent,
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 700,
    '@media (min-width: 768px)': {
      width: '28px',
      height: '28px',
      fontSize: '14px',
    },
  }),
  // Desktop nav (hidden on mobile)
  nav: css({
    display: 'none',
    '@media (min-width: 768px)': {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
  }),
  navLink: css({
    padding: '8px 14px',
    borderRadius: tokens.radii.md,
    fontSize: '14px',
    fontWeight: 500,
    color: tokens.colors.text,
    textDecoration: 'none',
    transition: 'all 0.1s ease',
    '&:hover': {
      background: tokens.colors.bgAlt,
      color: tokens.colors.textHeading,
    },
    '&.active': {
      background: tokens.colors.accentLight,
      color: tokens.colors.accent,
      fontWeight: 600,
    },
  }),
  // Desktop right side
  right: css({
    display: 'none',
    '@media (min-width: 768px)': {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
  }),
  search: css({
    width: '200px',
    padding: '7px 12px 7px 34px',
    fontSize: '13px',
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radii.md,
    background: tokens.colors.bgAlt,
    outline: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236b6675' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.3-4.3'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '11px center',
    '&:focus': {
      background: tokens.colors.bg,
      borderColor: tokens.colors.accent,
    },
    '@media (min-width: 1024px)': {
      width: '240px',
    },
  }),
  cta: css({
    background: tokens.colors.accent,
    color: '#fff',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: 600,
    borderRadius: tokens.radii.md,
    textDecoration: 'none',
    transition: 'background 0.1s ease',
    '&:hover': {
      background: tokens.colors.accentHover,
    },
  }),

  // Hamburger button (mobile only)
  hamburger: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    border: 'none',
    background: 'transparent',
    color: tokens.colors.text,
    cursor: 'pointer',
    '@media (min-width: 768px)': {
      display: 'none',
    },
  }),

  // Mobile menu overlay
  mobileMenu: css({
    position: 'fixed',
    inset: 0,
    zIndex: 300,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'flex-end',
  }),
  mobileMenuPanel: css({
    width: '100%',
    maxWidth: '320px',
    background: tokens.colors.bg,
    height: '100%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
    '@media (min-width: 768px)': {
      display: 'none',
    },
  }),
  mobileMenuHeader: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  }),
  mobileNav: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    marginBottom: '20px',
  }),
  mobileNavLink: css({
    padding: '12px 14px',
    borderRadius: tokens.radii.md,
    fontSize: '16px',
    fontWeight: 500,
    color: tokens.colors.text,
    textDecoration: 'none',
    '&.active': {
      background: tokens.colors.accentLight,
      color: tokens.colors.accent,
      fontWeight: 600,
    },
  }),
  mobileSearch: css({
    width: '100%',
    padding: '10px 14px 10px 38px',
    fontSize: '15px',
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radii.md,
    background: tokens.colors.bgAlt,
    outline: 'none',
    marginBottom: '20px',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b6675' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.3-4.3'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '13px center',
    '&:focus': {
      background: tokens.colors.bg,
      borderColor: tokens.colors.accent,
    },
  }),
  closeButton: css({
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    fontSize: '24px',
    color: tokens.colors.textMuted,
    cursor: 'pointer',
  }),
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  const handleMobileSearch = (e) => {
    if (e.key === 'Enter') {
      const q = e.currentTarget.value.trim()
      if (q) {
        closeMobileMenu()
        window.location.href = `/articles?search=${encodeURIComponent(q)}`
      }
    }
  }

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.inner}>
        <Link to="/" className={headerStyles.logo}>
          <div className={headerStyles.logoMark}>G</div>
          Grok Docs
        </Link>

        {/* Desktop nav */}
        <nav className={headerStyles.nav}>
          <NavLink
            to="/docs"
            className={({ isActive }) =>
              cx(headerStyles.navLink, isActive && 'active')
            }
          >
            Documentation
          </NavLink>
          <NavLink
            to="/articles"
            className={({ isActive }) =>
              cx(headerStyles.navLink, isActive && 'active')
            }
          >
            Articles
          </NavLink>
        </nav>

        {/* Desktop right side */}
        <div className={headerStyles.right}>
          <input
            type="text"
            placeholder="Search docs and articles..."
            className={headerStyles.search}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const q = e.currentTarget.value.trim()
                if (q) {
                  window.location.href = `/articles?search=${encodeURIComponent(q)}`
                }
              }
            }}
          />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={headerStyles.cta}
          >
            View on GitHub
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={headerStyles.hamburger}
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div
          className={headerStyles.mobileMenu}
          onClick={closeMobileMenu}
        >
          <div
            className={headerStyles.mobileMenuPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={headerStyles.mobileMenuHeader}>
              <Link to="/" className={headerStyles.logo} onClick={closeMobileMenu}>
                <div className={headerStyles.logoMark}>G</div>
                Grok Docs
              </Link>
              <button
                className={headerStyles.closeButton}
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <nav className={headerStyles.mobileNav}>
              <NavLink
                to="/docs"
                className={({ isActive }) =>
                  cx(headerStyles.mobileNavLink, isActive && 'active')
                }
                onClick={closeMobileMenu}
              >
                Documentation
              </NavLink>
              <NavLink
                to="/articles"
                className={({ isActive }) =>
                  cx(headerStyles.mobileNavLink, isActive && 'active')
                }
                onClick={closeMobileMenu}
              >
                Articles
              </NavLink>
            </nav>

            <input
              type="text"
              placeholder="Search docs and articles..."
              className={headerStyles.mobileSearch}
              onKeyDown={handleMobileSearch}
            />

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={headerStyles.cta}
              style={{ textAlign: 'center', padding: '12px 16px', fontSize: '15px' }}
              onClick={closeMobileMenu}
            >
              View on GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
