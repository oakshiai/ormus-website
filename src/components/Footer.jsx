import { css, tokens } from '../styles'

const footerStyles = {
  footer: css({
    borderTop: `1px solid ${tokens.colors.border}`,
    background: tokens.colors.bgAlt,
    padding: '32px 0',
    fontSize: '13px',
    color: tokens.colors.textMuted,
    marginTop: 'auto',
  }),
  inner: css({
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  }),
  links: css({
    display: 'flex',
    gap: '16px',
    a: {
      color: 'inherit',
      textDecoration: 'none',
      '&:hover': {
        color: tokens.colors.text,
      },
    },
  }),
}

export default function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.inner}>
        <div>
          © {new Date().getFullYear()} Grok. Documentation and articles for the Grok CLI.
        </div>
        <div className={footerStyles.links}>
          <a href="https://github.com" target="_blank" rel="noopener">
            GitHub
          </a>
          <a href="https://x.com" target="_blank" rel="noopener">
            X
          </a>
          <a href="#">Changelog</a>
          <a href="#">License</a>
        </div>
      </div>
    </footer>
  )
}
