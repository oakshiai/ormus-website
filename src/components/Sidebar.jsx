import { NavLink } from 'react-router-dom'
import { css, cx, tokens } from '../styles'

const sidebarStyles = {
  sidebar: css({
    display: 'none',
    '@media (min-width: 768px)': {
      display: 'block',
      width: '240px',
      flexShrink: 0,
      background: tokens.colors.bgSidebar,
      borderRight: `1px solid ${tokens.colors.border}`,
      padding: '20px 0',
      height: 'calc(100vh - 64px)',
      overflowY: 'auto',
      position: 'sticky',
      top: '64px',
    },
  }),
  section: css({
    padding: '0 20px',
    marginBottom: '24px',
  }),
  title: css({
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    color: tokens.colors.textMuted,
    marginBottom: '10px',
    paddingLeft: '4px',
  }),
  link: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    margin: '1px 0',
    fontSize: '14px',
    color: tokens.colors.text,
    textDecoration: 'none',
    borderRadius: tokens.radii.md,
    transition: 'all 0.1s ease',
    '&:hover': {
      background: tokens.colors.bgAlt,
    },
    '&.active': {
      background: tokens.colors.accentLight,
      color: tokens.colors.accent,
      fontWeight: 600,
    },
  }),
  group: css({
    marginTop: '16px',
  }),
  groupTitle: css({
    fontSize: '12px',
    fontWeight: 600,
    color: tokens.colors.textMuted,
    padding: '4px 12px',
    marginBottom: '2px',
  }),
  footer: css({
    marginTop: '40px',
    padding: '16px 20px',
    borderTop: `1px solid ${tokens.colors.border}`,
    fontSize: '12px',
    color: tokens.colors.textMuted,
  }),
}

function Sidebar({ title = 'Navigation', children, groups, items }) {
  return (
    <aside className={sidebarStyles.sidebar}>
      <div className={sidebarStyles.section}>
        <div className={sidebarStyles.title}>{title}</div>

        {children && <div>{children}</div>}

        {/* Flat list of items (new docs system) */}
        {items && items.length > 0 && (
          <div>
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cx(sidebarStyles.link, isActive && 'active')
                }
                end={item.end}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}

        {/* Grouped navigation (legacy support) */}
        {groups &&
          groups.map((group, idx) => (
            <div key={idx} className={sidebarStyles.group}>
              {group.title && (
                <div className={sidebarStyles.groupTitle}>{group.title}</div>
              )}
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cx(sidebarStyles.link, isActive && 'active')
                  }
                  end={item.end}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
      </div>

      <div className={sidebarStyles.footer}>
        Version 4.3.0 • Last updated Oct 2026
      </div>
    </aside>
  )
}

export { Sidebar }
