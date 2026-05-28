import { useParams, Link, useSearchParams } from 'react-router-dom'
import { css, cx, tokens, baseStyles } from '../styles'
import { articles, getArticleBySlug } from '../content/articles.jsx'

const articlesStyles = {
  container: css({
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '28px 20px 60px',
    '@media (min-width: 768px)': {
      padding: '40px 24px 80px',
    },
  }),
  header: css({
    marginBottom: '24px',
    '@media (min-width: 768px)': {
      marginBottom: '32px',
    },
  }),
  title: css({
    fontSize: '28px',
    fontWeight: 700,
    color: tokens.colors.textHeading,
    margin: 0,
    letterSpacing: '-0.4px',
    '@media (min-width: 768px)': {
      fontSize: '34px',
      letterSpacing: '-0.5px',
    },
  }),
  subtitle: css({
    marginTop: '6px',
    fontSize: '14px',
    color: tokens.colors.textMuted,
    '@media (min-width: 768px)': {
      fontSize: '15px',
    },
  }),
  searchRow: css({
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
  }),
  grid: css({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '14px',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '18px',
    },
  }),
  card: css({
    background: tokens.colors.cardBg,
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radii.lg,
    padding: '22px',
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.1s ease',
    '&:hover': {
      borderColor: tokens.colors.accent,
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
    },
  }),
  cardMeta: css({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '12px',
    color: tokens.colors.textMuted,
    marginBottom: '10px',
  }),
  cardTitle: css({
    fontSize: '19px',
    fontWeight: 600,
    color: tokens.colors.textHeading,
    lineHeight: 1.3,
    marginBottom: '10px',
  }),
  cardExcerpt: css({
    fontSize: '14px',
    lineHeight: 1.55,
    color: tokens.colors.text,
    flex: 1,
  }),
  tags: css({
    display: 'flex',
    gap: '6px',
    marginTop: '16px',
    flexWrap: 'wrap',
  }),
  tag: css({
    fontSize: '11px',
    padding: '2px 9px',
    borderRadius: '999px',
    background: tokens.colors.bgAlt,
    color: tokens.colors.textMuted,
  }),
  articleHeader: css({
    maxWidth: '720px',
  }),
  articleMeta: css({
    display: 'flex',
    gap: '16px',
    fontSize: '13px',
    color: tokens.colors.textMuted,
    marginTop: '12px',
  }),
  backLink: css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: tokens.colors.accent,
    textDecoration: 'none',
    marginBottom: '20px',
    '&:hover': { textDecoration: 'underline' },
  }),
  single: css({
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 64px)',
  }),
  singleMain: css({
    flex: 1,
    padding: '28px 20px',
    maxWidth: '780px',
    margin: '0 auto',
    width: '100%',
    '@media (min-width: 768px)': {
      padding: '40px 24px',
    },
  }),
}

export default function Articles() {
  const { slug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || ''

  const currentArticle = slug ? getArticleBySlug(slug) : null

  // Filter articles
  const filteredArticles = articles.filter((a) => {
    if (!searchTerm) return true
    const q = searchTerm.toLowerCase()
    return (
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.includes(q))
    )
  })

  // Single article view
  if (currentArticle) {
    return (
      <div className={articlesStyles.single}>
        <div className={articlesStyles.singleMain}>
          <Link to="/articles" className={articlesStyles.backLink}>
            ← All articles
          </Link>

          <div className={articlesStyles.articleHeader}>
            <h1 className={articlesStyles.title}>{currentArticle.title}</h1>
            <div className={articlesStyles.articleMeta}>
              <span>{currentArticle.author}</span>
              <span>•</span>
              <span>{currentArticle.date}</span>
              <span>•</span>
              <span>{currentArticle.readTime} read</span>
            </div>
            <div className={articlesStyles.tags} style={{ marginTop: '16px' }}>
              {currentArticle.tags.map((tag) => (
                <span key={tag} className={articlesStyles.tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '40px' }} className={baseStyles.prose}>
            {currentArticle.content}
          </div>

          <div style={{ marginTop: '64px', paddingTop: '24px', borderTop: `1px solid ${tokens.colors.border}` }}>
            <Link to="/articles" style={{ color: tokens.colors.accent, fontSize: '14px' }}>
              ← Back to all articles
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Listing view
  return (
    <div>
      <div className={articlesStyles.container}>
        <div className={articlesStyles.header}>
          <h1 className={articlesStyles.title}>Articles</h1>
          <p className={articlesStyles.subtitle}>
            Deep dives, tutorials, release notes, and essays from the team behind Grok.
          </p>
        </div>

        <div className={articlesStyles.searchRow}>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => {
              const val = e.target.value
              if (val) {
                setSearchParams({ search: val })
              } else {
                setSearchParams({})
              }
            }}
            className={baseStyles.input}
            style={{ maxWidth: '380px' }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchParams({})}
              style={{
                border: 'none',
                background: 'transparent',
                color: tokens.colors.textMuted,
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Clear
            </button>
          )}
        </div>

        {filteredArticles.length === 0 && (
          <div style={{ padding: '40px 0', color: tokens.colors.textMuted }}>
            No articles found for “{searchTerm}”.
          </div>
        )}

        <div className={articlesStyles.grid}>
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              to={`/articles/${article.slug}`}
              className={articlesStyles.card}
            >
              <div className={articlesStyles.cardMeta}>
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
              <div className={articlesStyles.cardTitle}>{article.title}</div>
              <div className={articlesStyles.cardExcerpt}>{article.excerpt}</div>
              <div className={articlesStyles.tags}>
                {article.tags.map((tag) => (
                  <span key={tag} className={articlesStyles.tag}>{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
