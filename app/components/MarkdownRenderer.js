import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // You can choose a different style if you like

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
