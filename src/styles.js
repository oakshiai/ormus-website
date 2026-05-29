import { css, cx } from '@emotion/css'

export { css, cx }

// Design tokens (colors use CSS variables for light/dark + user toggle support)
export const tokens = {
  colors: {
    bg: 'var(--bg)',
    bgAlt: 'var(--bg-alt)',
    bgSidebar: 'var(--bg-sidebar)',
    text: 'var(--text)',
    textMuted: 'var(--text-muted)',
    textHeading: 'var(--text-heading)',
    border: 'var(--border)',
    accent: 'var(--accent)',
    accentHover: 'var(--accent-hover)',
    accentLight: 'var(--accent-light)',
    codeBg: 'var(--code-bg)',
    cardBg: 'var(--card-bg)',
    shadow: 'var(--shadow)',
  },
  fonts: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  radii: {
    sm: '4px',
    md: '6px',
    lg: '10px',
  },
}

// Common reusable style blocks
export const baseStyles = {
  reset: css({
    boxSizing: 'border-box',
  }),
  container: css({
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
  }),
  prose: css({
    fontSize: '15px',
    lineHeight: 1.65,
    color: tokens.colors.text,
    '& h1': {
      fontSize: '24px',
      fontWeight: 600,
      color: tokens.colors.textHeading,
      marginTop: 0,
      marginBottom: '14px',
      letterSpacing: '-0.3px',
      '@media (min-width: 768px)': {
        fontSize: '28px',
        marginBottom: '16px',
      },
    },
    '& h2': {
      fontSize: '18px',
      fontWeight: 600,
      color: tokens.colors.textHeading,
      marginTop: '28px',
      marginBottom: '10px',
      '@media (min-width: 768px)': {
        fontSize: '20px',
        marginTop: '32px',
      },
    },
    '& h3': {
      fontSize: '16px',
      fontWeight: 600,
      color: tokens.colors.textHeading,
      marginTop: '20px',
      marginBottom: '8px',
    },
    '& p': {
      margin: '0 0 14px',
    },
    '& ul, & ol': {
      margin: '0 0 14px',
      paddingLeft: '18px',
    },
    '& li': {
      marginBottom: '5px',
    },
    '& code': {
      background: tokens.colors.codeBg,
      padding: '2px 5px',
      borderRadius: '4px',
      fontSize: '13px',
      fontFamily: tokens.fonts.mono,
    },
    '& pre': {
      background: tokens.colors.bgAlt,
      padding: '14px',
      borderRadius: tokens.radii.md,
      overflowX: 'auto',
      fontSize: '13px',
      fontFamily: tokens.fonts.mono,
      border: `1px solid ${tokens.colors.border}`,
      '@media (min-width: 768px)': {
        padding: '16px',
        fontSize: '14px',
      },
    },
    // Reset inline code styling inside fenced code blocks so the whole
    // block uses only the pre container background (no per-line or nested
    // pill backgrounds on the code content).
    '& pre code': {
      background: 'transparent',
      padding: 0,
      borderRadius: 0,
      fontSize: 'inherit',
      boxShadow: 'none',
    },
    '& a': {
      color: tokens.colors.accent,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& table': {
      width: '100%',
      borderCollapse: 'collapse',
      margin: '16px 0',
      fontSize: '14px',
    },
    '& th, & td': {
      border: `1px solid ${tokens.colors.border}`,
      padding: '8px 10px',
      textAlign: 'left',
    },
    '& th': {
      background: tokens.colors.bgAlt,
      fontWeight: 600,
    },
    '& blockquote': {
      margin: '16px 0',
      padding: '0 0 0 16px',
      borderLeft: `4px solid ${tokens.colors.accent}`,
      color: tokens.colors.textMuted,
    },
    '& hr': {
      border: 'none',
      borderTop: `1px solid ${tokens.colors.border}`,
      margin: '24px 0',
    },
  }),
  card: css({
    background: tokens.colors.cardBg,
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radii.lg,
    padding: '20px',
    boxShadow: tokens.colors.shadow,
    transition: 'transform 0.1s ease, box-shadow 0.1s ease',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    },
  }),
  button: css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '9px 18px',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: tokens.radii.md,
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.1s ease',
  }),
  input: css({
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radii.md,
    background: tokens.colors.bg,
    outline: 'none',
    '&:focus': {
      borderColor: tokens.colors.accent,
      boxShadow: `0 0 0 3px ${tokens.colors.accentLight}`,
    },
  }),
}
