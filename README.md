# FluentMarkdown

A React library that **transforms Markdown** into **Fluent UI (v9)** components, leveraging [react-markdown](https://github.com/remarkjs/react-markdown).

## Features

- Headings mapped to Fluent `<Title1>`, `<Title2>`, `<Subtitle1>`
- Paragraphs mapped to `<Body1>`
- Links mapped to `<Link>`
- Lists, images, blockquotes, code blocks, etc.

## Key Capabilities

### Accessibility (enabled by default)

ARIA attributes like `role="heading"`, `aria-level` for headings, and `aria-label` for links/code blocks. Pass `enableAccessibility={false}` to turn these off if needed.

### Sanitization (enabled by default)

Strips potentially dangerous HTML via `rehype-sanitize`. Pass `sanitize={false}` if you fully trust your Markdown source.

## Quick Start

```tsx
<FluentMarkdown 
  content={markdownContent} 
  enableAccessibility={false} // turns off ARIA attributes
  sanitize={false}           // turns off HTML sanitization
/>
```

## Installation

```bash
npm install fluentmarkdown
# or
yarn add fluentmarkdown
```

### Dependencies

- React (>= 18)
- @fluentui/react-components (Fluent UI v9)
- react-markdown (included or listed as peer dependency)

## Usage

### Basic Example

```jsx
import React from 'react';
import { FluentMarkdown } from 'fluentmarkdown';

export function MyScreen() {
  const content = `
# Hello Fluent
**This** is *Markdown*.

- One
- Two
- Three
`;

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <FluentMarkdown content={content} />
    </div>
  );
}
```

### Extended Example with FluentProvider

```jsx
import React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { FluentMarkdown } from 'fluentmarkdown';

export function App() {
  const content = '# Heading\n\nThis is a paragraph with **bold** text.';

  return (
    <FluentProvider theme={webLightTheme}>
      <FluentMarkdown content={content} />
    </FluentProvider>
  );
}
```

## Core Features

1. **Fluent Theming**
    - All text uses Fluent UI typography and respects your `<FluentProvider>` theme

2. **Accessibility**
    - Enabled by default with ARIA attributes
    - Configurable via `enableAccessibility` prop

3. **Sanitization**
    - HTML sanitization enabled by default
    - Configurable via `sanitize` prop

4. **Component Mapping**
    - Lists: `<ul>`, `<ol>`, `<li>` → standard HTML with `<Body1>` text
    - Images: `<img>` → Fluent `<Image>`

## Screenshots

![FluentMarkdown rendering a doc](https://via.placeholder.com/600x400.png?text=FluentMarkdown+Screenshot2)

## API Reference

### FluentMarkdown Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| content | string | — | Raw Markdown text to render |
| enableAccessibility | boolean | true | Enable ARIA attributes |
| sanitize | boolean | true | Enable HTML sanitization |

Good catch! Here's how those sections should be written with proper linking:

## Contributing

See our [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to clone, build, and submit PRs.

## License

This project is licensed under the [MIT License](./LICENSE).
