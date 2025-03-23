# @richmd/js

A JavaScript library for converting Markdown to HTML with rich features. This package is part of the Richmd ecosystem, providing a simple way to render Markdown content as HTML in JavaScript applications.

## Features

- Converts Markdown to HTML
- Supports standard Markdown syntax
- Enhanced features:
  - Syntax highlighting for code blocks
  - Math expressions with KaTeX
  - Tables
  - Task lists
  - Blockquotes
  - Details/summary blocks
  - Color blocks
  - Custom tags
- Includes CSS styling for rendered content

## Installation

You can install @richmd/js using npm, yarn, or pnpm:

```bash
# Using npm
npm install @richmd/js

# Using yarn
yarn add @richmd/js

# Using pnpm
pnpm add @richmd/js
```

## Usage

### Basic Usage

```javascript
import { richmd } from '@richmd/js';
import '@richmd/js/dist/richmd.css'; // Import the styles

// Convert Markdown to HTML
const markdown = '# Hello World\n\nThis is a **bold** text.';
const html = richmd(markdown);

// Use the HTML in your application
document.getElementById('content').innerHTML = html;
```

## Supported Markdown Syntax

@richmd/js supports standard Markdown syntax as well as extended features:

### Basic Markdown

- Headings (`# Heading`)
- Emphasis (`*italic*`, `**bold**`)
- Lists (ordered and unordered)
- Links (`[text](url)`)
- Images (`![alt](src)`)
- Code blocks (``` code ```)
- Blockquotes (`> quote`)
- Horizontal rules (`---`)

### Extended Features

- Task lists (`- [ ] task` or `- [x] completed task`)
- Tables
- Math expressions using KaTeX
- Color blocks
- Details/summary blocks
- Custom tags

## Dependencies

@richmd/js depends on:

- @richmd/core - Core parsing functionality
- highlight.js - For code syntax highlighting
- katex - For rendering mathematical expressions

## License

MIT
