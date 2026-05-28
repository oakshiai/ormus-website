import React from 'react'

export const docCategories = [
  { id: 'basics', label: 'Getting Started' },
  { id: 'reference', label: 'Reference' },
  { id: 'advanced', label: 'Advanced' },
]

export const docs = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    category: 'basics',
    description: 'Install Grok and start using the interactive CLI in minutes.',
    lastUpdated: 'Oct 12, 2026',
    sections: [
      {
        heading: 'Installation',
        body: (
          <>
            <p>
              The fastest way to install Grok is using your preferred package manager:
            </p>
            <pre>{`npm install -g @xai/grok
# or
pnpm add -g @xai/grok
# or
brew install grok`}</pre>
            <p>After installation, run the CLI with the <code>grok</code> command.</p>
          </>
        ),
      },
      {
        heading: 'First Run',
        body: (
          <>
            <p>
              On first launch Grok will ask you to authenticate with your xAI account.
              You can also provide an API key via the <code>GROK_API_KEY</code> environment
              variable.
            </p>
            <p>
              Once authenticated you will be dropped into the beautiful TUI with a
              clean command prompt.
            </p>
          </>
        ),
      },
      {
        heading: 'Basic Commands',
        body: (
          <ul>
            <li><code>/help</code> – Show all available commands</li>
            <li><code>/new</code> – Start a fresh conversation</li>
            <li><code>/exit</code> – Quit the TUI</li>
            <li>Just start typing to chat with Grok</li>
          </ul>
        ),
      },
    ],
  },
  {
    slug: 'configuration',
    title: 'Configuration',
    category: 'basics',
    description: 'Customize Grok behavior, themes, keyboard shortcuts, and more.',
    lastUpdated: 'Oct 10, 2026',
    sections: [
      {
        heading: 'Config File',
        body: (
          <>
            <p>
              Grok stores its configuration in <code>~/.grok/config.json</code>.
              You can edit it directly or use the <code>/config</code> command inside the TUI.
            </p>
          </>
        ),
      },
      {
        heading: 'Key Options',
        body: (
          <ul>
            <li><strong>theme</strong> – "light" | "dark" | "system"</li>
            <li><strong>model</strong> – Default model to use (grok-4, grok-3, etc)</li>
            <li><strong>skillsDir</strong> – Custom directory for your skills</li>
            <li><strong>maxHistory</strong> – Number of conversations to keep</li>
          </ul>
        ),
      },
    ],
  },
  {
    slug: 'cli-reference',
    title: 'CLI Reference',
    category: 'reference',
    description: 'Complete list of commands and keyboard shortcuts available in the TUI.',
    lastUpdated: 'Oct 14, 2026',
    sections: [
      {
        heading: 'Slash Commands',
        body: (
          <>
            <p>All commands start with a forward slash:</p>
            <pre>{`/help          Show this help
/new           Start new conversation
/docs          Open documentation
/skills        Manage installed skills
/config        Edit configuration
/mcp           List MCP servers
/clear         Clear the current screen`}</pre>
          </>
        ),
      },
      {
        heading: 'Keyboard Shortcuts',
        body: (
          <ul>
            <li><code>Ctrl+L</code> – Clear screen</li>
            <li><code>Ctrl+K</code> – Quick command palette</li>
            <li><code>Ctrl+J</code> – Toggle sidebar</li>
            <li><code>Up/Down</code> – Navigate history</li>
            <li><code>Escape</code> – Cancel current action</li>
          </ul>
        ),
      },
    ],
  },
  {
    slug: 'skills',
    title: 'Skills',
    category: 'advanced',
    description: 'Extend Grok with custom skills written in JavaScript.',
    lastUpdated: 'Oct 9, 2026',
    sections: [
      {
        heading: 'What are Skills?',
        body: (
          <p>
            Skills are JavaScript modules that add new capabilities to Grok. They can
            respond to natural language, add new slash commands, or integrate with
            external services.
          </p>
        ),
      },
      {
        heading: 'Creating a Skill',
        body: (
          <>
            <p>Skills live in <code>~/.grok/skills/</code>. Each skill is a folder with a <code>SKILL.md</code> and an entry file.</p>
            <pre>{`// my-skill/index.js
export default {
  name: 'My Skill',
  description: 'Does something useful',
  async run(context) {
    // context contains message, history, etc.
    return 'Hello from my skill!'
  }
}`}</pre>
          </>
        ),
      },
    ],
  },
  {
    slug: 'mcp-servers',
    title: 'MCP Servers',
    category: 'advanced',
    description: 'Connect Grok to external tools and data sources using the Model Context Protocol.',
    lastUpdated: 'Oct 11, 2026',
    sections: [
      {
        heading: 'Connecting Servers',
        body: (
          <p>
            Use the <code>/mcp add</code> command or edit your config file to connect
            to any MCP-compatible server. Grok automatically discovers available tools.
          </p>
        ),
      },
      {
        heading: 'Popular Servers',
        body: (
          <ul>
            <li>Filesystem access</li>
            <li>GitHub integration</li>
            <li>Linear / Jira</li>
            <li>Slack and Discord</li>
            <li>PostgreSQL / SQLite</li>
          </ul>
        ),
      },
    ],
  },
]

export function getDocBySlug(slug) {
  return docs.find((d) => d.slug === slug)
}

export function getAllDocs() {
  return docs
}
