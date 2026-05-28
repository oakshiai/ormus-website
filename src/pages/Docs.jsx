import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { css, cx, tokens, baseStyles } from '../styles'
import Sidebar from '../components/Sidebar'
import { docs, getDocBySlug, docCategories } from '../content/docs.jsx'
import Footer from '../components/Footer'

const docsStyles = {
  layout: css({
    display: 'flex',
    minHeight: 'calc(100vh - 64px)',
  }),
  main: css({
    flex: 1,
    minWidth: 0,
    padding: '24px 20px 60px',
    background: tokens.colors.bg,
    '@media (min-width: 768px)': {
      padding: '40px 48px 80px',
    },
  }),
  header: css({
    marginBottom: '24px',
    '@media (min-width: 768px)': {
      marginBottom: '32px',
    },
  }),
  title: css({
    fontSize: '26px',
    fontWeight: 700,
    color: tokens.colors.textHeading,
    margin: '0 0 6px',
    letterSpacing: '-0.4px',
    '@media (min-width: 768px)': {
      fontSize: '34px',
      letterSpacing: '-0.5px',
    },
  }),
  meta: css({
    display: 'flex',
    gap: '12px',
    fontSize: '12px',
    color: tokens.colors.textMuted,
    flexWrap: 'wrap',
    '@media (min-width: 768px)': {
      fontSize: '13px',
      gap: '16px',
    },
  }),
  indexGrid: css({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '12px',
    marginTop: '16px',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '18px',
    },
  }),
  docCard: css({
    ...baseStyles.card.styles,
    padding: '16px',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    '&:hover': {
      borderColor: tokens.colors.accent,
    },
    '@media (min-width: 768px)': {
      padding: '20px',
    },
  }),
  docCardTitle: css({
    fontSize: '16px',
    fontWeight: 600,
    color: tokens.colors.textHeading,
    marginBottom: '6px',
    '@media (min-width: 768px)': {
      fontSize: '18px',
    },
  }),
  docCardDesc: css({
    fontSize: '13px',
    color: tokens.colors.text,
    lineHeight: 1.45,
  }),
  categoryLabel: css({
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    color: tokens.colors.accent,
    marginBottom: '4px',
  }),
  section: css({
    marginBottom: '28px',
    '@media (min-width: 768px)': {
      marginBottom: '32px',
    },
  }),
  sectionHeading: css({
    fontSize: '13px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: tokens.colors.textMuted,
    marginBottom: '12px',
  }),
  toc: css({
    display: 'none',
    '@media (min-width: 1024px)': {
      display: 'block',
      position: 'sticky',
      top: '90px',
      alignSelf: 'start',
      width: '200px',
      paddingLeft: '24px',
      borderLeft: `1px solid ${tokens.colors.border}`,
      fontSize: '13px',
      color: tokens.colors.textMuted,
      flexShrink: 0,
    },
  }),
  tocLink: css({
    display: 'block',
    padding: '5px 0',
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: tokens.colors.text,
    },
  }),
  contentWrapper: css({
    display: 'flex',
    gap: '32px',
    '@media (min-width: 1024px)': {
      gap: '48px',
    },
  }),
  backLink: css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: tokens.colors.accent,
    textDecoration: 'none',
    marginBottom: '12px',
    '&:hover': {
      textDecoration: 'underline',
    },
  }),
  // Mobile contents button + drawer
  mobileTocButton: css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: tokens.colors.bgAlt,
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radii.md,
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: 500,
    color: tokens.colors.text,
    marginBottom: '20px',
    cursor: 'pointer',
    '@media (min-width: 1024px)': {
      display: 'none',
    },
  }),
  mobileDrawer: css({
    position: 'fixed',
    inset: 0,
    zIndex: 250,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'flex-end',
  }),
  mobileDrawerPanel: css({
    width: '86%',
    maxWidth: '300px',
    background: tokens.colors.bg,
    height: '100%',
    padding: '20px',
    overflowY: 'auto',
    boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
  }),
}

export default function Docs() {
  const { slug } = useParams()
  const currentDoc = slug ? getDocBySlug(slug) : null
  const [mobileTocOpen, setMobileTocOpen] = useState(false)

  // Build sidebar groups from categories
  const sidebarGroups = docCategories.map((cat) => ({
    title: cat.label,
    items: docs
      .filter((d) => d.category === cat.id)
      .map((d) => ({
        to: `/docs/${d.slug}`,
        label: d.title,
      })),
  }))

  // Index view (no slug)
  if (!currentDoc) {
    return (
      <div className={docsStyles.layout}>
        <Sidebar title="Documentation" groups={sidebarGroups} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div className={docsStyles.main}>
            <div className={docsStyles.header}>
              <h1 className={docsStyles.title}>Documentation</h1>
              <p style={{ fontSize: '15px', color: tokens.colors.textMuted, maxWidth: 620 }}>
                Learn how to install, configure, and extend Grok. Everything you need
                to become productive quickly.
              </p>
            </div>

            {docCategories.map((category) => {
              const categoryDocs = docs.filter((d) => d.category === category.id)
              return (
                <div key={category.id} className={docsStyles.section}>
                  <div className={docsStyles.categoryLabel}>{category.label}</div>
                  <div className={docsStyles.indexGrid}>
                    {categoryDocs.map((doc) => (
                      <Link
                        key={doc.slug}
                        to={`/docs/${doc.slug}`}
                        className={docsStyles.docCard}
                      >
                        <div className={docsStyles.docCardTitle}>{doc.title}</div>
                        <div className={docsStyles.docCardDesc}>{doc.description}</div>
                        <div style={{ marginTop: '14px', fontSize: '12px', color: tokens.colors.textMuted }}>
                          Updated {doc.lastUpdated}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <Footer />
        </div>
      </div>
    )
  }

  // Individual doc view
  return (
    <div className={docsStyles.layout}>
      <Sidebar title="Documentation" groups={sidebarGroups} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div className={docsStyles.main}>
          <Link to="/docs" className={docsStyles.backLink}>← All documentation</Link>

          {/* Mobile Contents button */}
          <button
            type="button"
            className={docsStyles.mobileTocButton}
            onClick={() => setMobileTocOpen(true)}
          >
            ☰ Contents
          </button>

          <div className={docsStyles.contentWrapper}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className={docsStyles.header}>
                <h1 className={docsStyles.title}>{currentDoc.title}</h1>
                <div className={docsStyles.meta}>
                  <span>Last updated: {currentDoc.lastUpdated}</span>
                  <span>•</span>
                  <span>{currentDoc.sections.length} sections</span>
                </div>
              </div>

              <div className={baseStyles.prose}>
                {currentDoc.sections.map((section, idx) => (
                  <div key={idx} id={`section-${idx}`}>
                    <h2>{section.heading}</h2>
                    <div>{section.body}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: `1px solid ${tokens.colors.border}` }}>
                <div style={{ fontSize: '13px', color: tokens.colors.textMuted }}>
                  Was this page helpful? <a href="#">Yes</a> · <a href="#">No</a>
                </div>
              </div>
            </div>

            {/* Desktop Table of Contents */}
            <div className={docsStyles.toc}>
              <div style={{ fontWeight: 600, marginBottom: '10px', color: tokens.colors.textHeading }}>
                On this page
              </div>
              {currentDoc.sections.map((section, idx) => (
                <a
                  key={idx}
                  href={`#section-${idx}`}
                  className={docsStyles.tocLink}
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById(`section-${idx}`)
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                >
                  {section.heading}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* Mobile navigation drawer for docs */}
      {mobileTocOpen && (
        <div className={docsStyles.mobileDrawer} onClick={() => setMobileTocOpen(false)}>
          <div
            className={docsStyles.mobileDrawerPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontWeight: 600, fontSize: '15px' }}>Contents</div>
              <button
                onClick={() => setMobileTocOpen(false)}
                style={{ fontSize: '22px', background: 'none', border: 'none', color: tokens.colors.textMuted }}
              >
                ×
              </button>
            </div>

            {/* Re-render the same navigation groups */}
            {sidebarGroups.map((group, idx) => (
              <div key={idx} style={{ marginBottom: '16px' }}>
                {group.title && (
                  <div style={{ fontSize: '11px', fontWeight: 700, color: tokens.colors.textMuted, padding: '4px 8px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                    {group.title}
                  </div>
                )}
                {group.items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileTocOpen(false)}
                    style={{
                      display: 'block',
                      padding: '9px 12px',
                      fontSize: '14px',
                      color: tokens.colors.text,
                      textDecoration: 'none',
                      borderRadius: '6px',
                      marginBottom: '1px',
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: `1px solid ${tokens.colors.border}`, fontSize: '12px', color: tokens.colors.textMuted }}>
              Version 4.3.0 • Oct 2026
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
