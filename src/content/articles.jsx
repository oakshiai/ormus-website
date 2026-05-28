import React from 'react'

export const articles = [
  {
    slug: 'introducing-grok-4-3',
    title: 'Introducing Grok 4.3',
    excerpt: 'New capabilities, improved reasoning, and a dramatically better TUI experience.',
    date: 'October 8, 2026',
    readTime: '6 min',
    author: 'The Grok Team',
    tags: ['release', 'announcement'],
    content: (
      <>
        <p>
          Today we are excited to release Grok 4.3 — our biggest update since the
          introduction of the interactive CLI. This release focuses on three pillars:
          speed, extensibility, and delight.
        </p>
        <h2>What’s New</h2>
        <ul>
          <li>Native support for background agents and long-running tasks</li>
          <li>Completely rewritten rendering engine using React 19 under the hood</li>
          <li>Improved skill discovery and hot reloading during development</li>
          <li>New design system and vastly improved accessibility</li>
        </ul>
        <p>
          The new release is available now via npm and Homebrew. We can’t wait to
          see what you build with it.
        </p>
      </>
    ),
  },
  {
    slug: 'building-skills',
    title: 'Building Your First Custom Skill',
    excerpt: 'A practical walkthrough of creating a useful skill from scratch in under 30 minutes.',
    date: 'October 5, 2026',
    readTime: '12 min',
    author: 'Maya Chen',
    tags: ['tutorial', 'skills'],
    content: (
      <>
        <p>
          Skills are the most powerful way to extend Grok. In this guide we will
          build a skill that lets you query your company’s internal documentation
          using natural language.
        </p>
        <h2>Step 1: Scaffold the skill</h2>
        <p>
          Run <code>grok skill new my-docs</code> inside the TUI. This creates the
          recommended folder structure for you.
        </p>
        <h2>Step 2: Implement the handler</h2>
        <p>
          The core of every skill is the <code>run</code> function. You receive a
          rich context object and return either a string or a React component.
        </p>
        <pre>{`export default {
  name: 'Company Docs',
  description: 'Search internal documentation',
  async run({ message }) {
    const results = await searchDocs(message)
    return formatResults(results)
  }
}`}</pre>
        <p>
          That’s it. Drop the folder into <code>~/.grok/skills/</code> and Grok will
          pick it up automatically.
        </p>
      </>
    ),
  },
  {
    slug: 'architecture',
    title: 'Inside the Grok TUI Architecture',
    excerpt: 'How we built a delightful terminal interface using React, Ink, and a custom layout engine.',
    date: 'September 28, 2026',
    readTime: '15 min',
    author: 'Alex Rivera',
    tags: ['engineering', 'architecture'],
    content: (
      <>
        <p>
          The Grok TUI looks simple from the outside, but there is quite a lot
          happening under the surface. This post dives deep into the technical
          decisions that make the experience feel instant and alive.
        </p>
        <h2>Key Technical Choices</h2>
        <ul>
          <li>We use React 19 with a custom reconciler on top of Ink</li>
          <li>Layout is computed with a Yoga-based flex engine</li>
          <li>State lives in a tiny observable store with time-travel debugging</li>
          <li>Skills run in isolated worker threads when possible</li>
        </ul>
        <p>
          The biggest surprise for most contributors is how little custom terminal
          code exists. Almost everything is expressed through components and styles.
        </p>
      </>
    ),
  },
  {
    slug: 'tips-and-tricks',
    title: 'Power User Tips & Hidden Features',
    excerpt: 'Lesser-known commands, keyboard tricks, and workflow patterns that make you faster.',
    date: 'September 19, 2026',
    readTime: '8 min',
    author: 'Sam Patel',
    tags: ['tips', 'productivity'],
    content: (
      <>
        <p>
          After months of daily usage, the team has discovered several patterns
          that dramatically increase productivity when working with Grok.
        </p>
        <h2>Hidden Gems</h2>
        <ul>
          <li>Press <code>Ctrl+Space</code> anywhere to open the command palette</li>
          <li>Type <code>?</code> followed by a topic to jump straight to docs</li>
          <li>Use <code>/fork</code> to branch an existing conversation</li>
          <li>Drag and drop files onto the TUI to attach them to the current prompt</li>
        </ul>
        <p>
          We are constantly adding more of these small touches. If you find
          something cool, please share it in the community Discord.
        </p>
      </>
    ),
  },
  {
    slug: 'mcp-ecosystem',
    title: 'The Growing MCP Ecosystem',
    excerpt: 'How the Model Context Protocol is becoming the universal interface for AI tools.',
    date: 'September 12, 2026',
    readTime: '10 min',
    author: 'Jordan Lee',
    tags: ['mcp', 'ecosystem'],
    content: (
      <>
        <p>
          One of the most exciting developments in the Grok ecosystem has been the
          rapid adoption of the Model Context Protocol. Dozens of companies are
          now shipping MCP servers for their products.
        </p>
        <p>
          This post explores the current state of the ecosystem and what we expect
          to see over the next year.
        </p>
      </>
    ),
  },
]

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug)
}

export function getAllArticles() {
  return articles
}
