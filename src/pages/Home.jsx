import { Link } from 'react-router-dom'
import { css, cx, tokens, baseStyles } from '../styles'
import { articles } from '../content/articles.jsx'
import Code from '../components/Code'

const homeStyles = {
  hero: css({
    textAlign: 'center',
    padding: '48px 20px 36px',
    background: `linear-gradient(180deg, ${tokens.colors.bg} 0%, ${tokens.colors.bgAlt} 100%)`,
    borderBottom: `1px solid ${tokens.colors.border}`,
    '@media (min-width: 768px)': {
      padding: '72px 24px 48px',
    },
  }),
  heroTitle: css({
    fontSize: '36px',
    fontWeight: 700,
    letterSpacing: '-1.2px',
    color: tokens.colors.textHeading,
    margin: '0 0 14px',
    lineHeight: 1.1,
    '@media (min-width: 768px)': {
      fontSize: '52px',
      letterSpacing: '-1.7px',
    },
    '@media (min-width: 1024px)': {
      fontSize: '56px',
      letterSpacing: '-1.8px',
    },
  }),
  heroSubtitle: css({
    fontSize: '15.5px',
    color: tokens.colors.textMuted,
    maxWidth: '520px',
    margin: '0 auto 12px',
    lineHeight: 1.5,
    padding: '0 8px',
    '@media (min-width: 768px)': {
      fontSize: '17px',
      maxWidth: '580px',
    },
  }),
  ctaGroup: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
    '@media (min-width: 480px)': {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: '12px',
    },
  }),
  primaryCta: css({
    background: tokens.colors.accent,
    color: '#fff',
    padding: '14px 24px',
    fontSize: '15px',
    fontWeight: 600,
    borderRadius: tokens.radii.lg,
    textDecoration: 'none',
    width: '100%',
    maxWidth: '260px',
    textAlign: 'center',
    '@media (min-width: 480px)': {
      width: 'auto',
      maxWidth: 'none',
    },
    '&:hover': {
      background: tokens.colors.accentHover,
      transform: 'translateY(-1px)',
    },
  }),
  secondaryCta: css({
    background: tokens.colors.bg,
    color: tokens.colors.text,
    padding: '14px 24px',
    fontSize: '15px',
    fontWeight: 600,
    borderRadius: tokens.radii.lg,
    border: `1px solid ${tokens.colors.border}`,
    textDecoration: 'none',
    width: '100%',
    maxWidth: '260px',
    textAlign: 'center',
    '@media (min-width: 480px)': {
      width: 'auto',
      maxWidth: 'none',
    },
    '&:hover': {
      borderColor: tokens.colors.accent,
      color: tokens.colors.accent,
    },
  }),
  section: css({
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '40px 20px',
    '@media (min-width: 768px)': {
      padding: '56px 24px',
    },
  }),
  sectionHeader: css({
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: '18px',
    '@media (min-width: 768px)': {
      marginBottom: '24px',
    },
  }),
  sectionTitle: css({
    fontSize: '20px',
    fontWeight: 600,
    color: tokens.colors.textHeading,
    margin: 0,
    '@media (min-width: 768px)': {
      fontSize: '22px',
    },
  }),
  viewAll: css({
    fontSize: '14px',
    color: tokens.colors.accent,
    textDecoration: 'none',
    fontWeight: 500,
    '&:hover': {
      textDecoration: 'underline',
    },
  }),
  grid: css({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '14px',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '18px',
    },
  }),
  quickGrid: css({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '12px',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '14px',
    },
  }),
  quickLink: css({
    display: 'block',
    padding: '16px 18px',
    background: tokens.colors.bg,
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radii.lg,
    textDecoration: 'none',
    color: tokens.colors.text,
    transition: 'all 0.1s ease',
    '&:hover': {
      borderColor: tokens.colors.accent,
      boxShadow: tokens.colors.shadow,
    },
  }),
  quickLinkTitle: css({
    fontWeight: 600,
    color: tokens.colors.textHeading,
    marginBottom: '4px',
    fontSize: '15px',
  }),
  tag: css({
    display: 'inline-block',
    fontSize: '11px',
    padding: '1px 8px',
    borderRadius: '999px',
    background: tokens.colors.accentLight,
    color: tokens.colors.accent,
    alignSelf: 'flex-start',
  }),
  cardMeta: css({
    fontSize: '12px',
    color: tokens.colors.textMuted,
    marginBottom: '8px',
    display: 'flex',
    gap: '10px',
  }),
  cardTitle: css({
    fontSize: '16px',
    fontWeight: 600,
    color: tokens.colors.textHeading,
    lineHeight: 1.3,
    marginBottom: '8px',
    '@media (min-width: 768px)': {
      fontSize: '17px',
    },
  }),
  cardExcerpt: css({
    fontSize: '14px',
    color: tokens.colors.text,
    lineHeight: 1.45,
    flex: 1,
  }),
}

const cardBase = css({
  background: tokens.colors.cardBg,
  border: `1px solid ${tokens.colors.border}`,
  borderRadius: tokens.radii.lg,
  padding: '20px',
  boxShadow: tokens.colors.shadow,
  transition: 'transform 0.1s ease, box-shadow 0.1s ease',
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    boxShadow: '0 8px 20px rgba(0,0,0,0.07)',
    transform: 'translateY(-2px)',
  },
})

export default function Home() {
  const featured = articles.slice(0, 3)

  return (
    <div>
      <div className={homeStyles.hero}>
        <h1 className={homeStyles.heroTitle}>
          Learn<br /><Code>grok build</Code><br />with me
        </h1>
        <p className={homeStyles.heroSubtitle}>
          A new kind of coding tool from <a href="https://x.ai/news/grok-build-cli" target="_blank"
            rel="noopener noreferrer">xAI</a>. See how to use it, how it performs, and how to master it.
        </p>

        <div style={{ margin: '18px auto 22px', maxWidth: '620px', width: '100%' }}>
          <Code isCopyable>
            curl -fsSL https://x.ai/cli/install.sh
          </Code>
        </div>

        <div className={homeStyles.ctaGroup}>
          <Link to="/docs" className={homeStyles.primaryCta}>
            Browse Documentation
          </Link>
          <Link to="/articles" className={homeStyles.secondaryCta}>
            Read Articles
          </Link>
        </div>
      </div>

      <div className={homeStyles.section}>
        <div className={homeStyles.sectionHeader}>
          <h2 className={homeStyles.sectionTitle}>Quick Links</h2>
        </div>
        <div className={homeStyles.quickGrid}>
          <Link to="/docs/getting-started" className={homeStyles.quickLink}>
            <div className={homeStyles.quickLinkTitle}>Getting Started</div>
            <div style={{ fontSize: '13px', color: tokens.colors.textMuted }}>
              Install Grok and send your first message in under 2 minutes.
            </div>
          </Link>
          <Link to="/docs/skills" className={homeStyles.quickLink}>
            <div className={homeStyles.quickLinkTitle}>Building Skills</div>
            <div style={{ fontSize: '13px', color: tokens.colors.textMuted }}>
              Extend Grok with JavaScript. Full guide and examples.
            </div>
          </Link>
          <Link to="/docs/mcp-servers" className={homeStyles.quickLink}>
            <div className={homeStyles.quickLinkTitle}>MCP Integration</div>
            <div style={{ fontSize: '13px', color: tokens.colors.textMuted }}>
              Connect external tools and data sources.
            </div>
          </Link>
        </div>
      </div>

      <div className={homeStyles.section}>
        <div className={homeStyles.sectionHeader}>
          <h2 className={homeStyles.sectionTitle}>Featured Articles</h2>
          <Link to="/articles" className={homeStyles.viewAll}>View all →</Link>
        </div>

        <div className={homeStyles.grid}>
          {featured.map((article) => (
            <Link
              key={article.slug}
              to={`/articles/${article.slug}`}
              className={cardBase}
            >
              <div className={homeStyles.cardMeta}>
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
              <div className={homeStyles.cardTitle}>{article.title}</div>
              <div className={homeStyles.cardExcerpt}>{article.excerpt}</div>
              <div style={{ marginTop: '12px' }}>
                {article.tags.map((tag) => (
                  <span key={tag} className={homeStyles.tag} style={{ marginRight: 6 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
