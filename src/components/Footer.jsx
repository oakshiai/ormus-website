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
          © {new Date().getFullYear()} Morgan Wilde
        </div>
        <div className={footerStyles.links}>
          <a href="https://x.com/oakshiai" target="_blank" rel="noopener noreferrer">
            @oakshiai
          </a>
          <a href="https://github.com/oakshiai/ormus-website" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
