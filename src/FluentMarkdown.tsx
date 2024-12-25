import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import {
  Title1,
  Title2,
  Subtitle1,
  Body1,
  Body1Strong,
  Link as FluentLink,
  Divider,
  Image as FluentImage,
} from '@fluentui/react-components';

/**
 * Additional props for our custom 'code' renderer,
 * ensuring TypeScript recognizes 'inline' etc.
 */
type CodeProps = React.HTMLAttributes<HTMLElement> & {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export interface FluentMarkdownProps {
  /**
   * The raw Markdown text to render.
   */
  content: string;

  /**
   * If true (default), we add extra ARIA attributes for headings, links, etc.
   * If false, we skip those attributes (less accessible).
   */
  enableAccessibility?: boolean;

  /**
   * If true (default), we run 'rehype-sanitize' to strip potentially
   * dangerous HTML (XSS). If you fully trust your Markdown, set to false.
   */
  sanitize?: boolean;
}

/**
 * Create the mapping from Markdown elements to Fluent UI + HTML elements.
 */
function createFluentComponents(enableAccessibility: boolean): Components {
  return {
    //
    // Headings
    //
    h1: ({ children }) => (
      <Title1
        as="h1"
        role={enableAccessibility ? 'heading' : undefined}
        aria-level={enableAccessibility ? 1 : undefined}
      >
        {children}
      </Title1>
    ),
    h2: ({ children }) => (
      <Title2
        as="h2"
        role={enableAccessibility ? 'heading' : undefined}
        aria-level={enableAccessibility ? 2 : undefined}
      >
        {children}
      </Title2>
    ),
    h3: ({ children }) => (
      <Subtitle1
        as="h3"
        role={enableAccessibility ? 'heading' : undefined}
        aria-level={enableAccessibility ? 3 : undefined}
      >
        {children}
      </Subtitle1>
    ),

    //
    // Paragraph
    //
    p: ({ children }) => <Body1>{children}</Body1>,

    //
    // Strong / Bold
    //
    strong: ({ children }) => <Body1Strong>{children}</Body1Strong>,

    //
    // Links
    //
    a: ({ children, href }) => {
      /**
       * 'children' can be a string, array of React nodes, etc.
       * Safely convert it to a string for aria-label if needed.
       */
      let linkText = '';
      if (Array.isArray(children)) {
        linkText = children
          .map((child) => (typeof child === 'string' ? child : ''))
          .join('');
      } else if (typeof children === 'string') {
        linkText = children;
      }

      return (
        <FluentLink
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={enableAccessibility ? linkText || undefined : undefined}
        >
          {children}
        </FluentLink>
      );
    },

    //
    // Inline code + block code
    //
    code: ({ inline, children, ...props }: CodeProps) => {
      if (inline) {
        return (
          <code
            {...props}
            aria-label={enableAccessibility ? 'Inline code' : undefined}
          >
            {children}
          </code>
        );
      }
      // Removed role="region" here
      return (
        <pre
          {...props}
          aria-label={enableAccessibility ? 'Code block' : undefined}
        >
          {children}
        </pre>
      );
    },

    //
    // Blockquote
    //
    // Removed role="region" here
    blockquote: ({ children }) => (
      <blockquote
        aria-label={enableAccessibility ? 'Quotation' : undefined}
      >
        <Body1>{children}</Body1>
      </blockquote>
    ),

    //
    // Horizontal rule
    //
    hr: () => <Divider aria-hidden="true" />,

    //
    // Image
    //
    img: ({ src, alt }) => (
      <FluentImage
        src={src || ''}
        alt={alt || ''}
        aria-label={enableAccessibility ? alt || 'Image' : undefined}
      />
    ),

    //
    // Lists
    //
    ul: ({ children }) => <ul>{children}</ul>,
    ol: ({ children }) => <ol>{children}</ol>,
    li: ({ children }) => (
      <li>
        <Body1>{children}</Body1>
      </li>
    ),
  };
}

/**
 * FluentMarkdown component
 *
 * By default:
 *   - `enableAccessibility` = true
 *   - `sanitize` = true (uses rehype-sanitize)
 */
export const FluentMarkdown: React.FC<FluentMarkdownProps> = ({
  content,
  enableAccessibility = true,
  sanitize = true,
}) => {
  const components = createFluentComponents(enableAccessibility);

  // We only use rehype-sanitize if sanitize is true
  const rehypePlugins = sanitize ? [rehypeSanitize] : [];

  return (
    <ReactMarkdown components={components} rehypePlugins={rehypePlugins}>
      {content}
    </ReactMarkdown>
  );
};