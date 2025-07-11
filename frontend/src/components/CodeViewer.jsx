import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function CodeViewer({ file }) {
  if (!file) {
    return (
      <div className="w-full bg-white p-4 rounded shadow flex items-center justify-center min-h-[300px] text-gray-500">
        Select a file to view its code.
      </div>
    );
  }

  // Auto-detect language from file extension
  const getLanguage = (path) => {
    if (!path) return 'text';
    if (path.endsWith('.html')) return 'html';
    if (path.endsWith('.css')) return 'css';
    if (path.endsWith('.js')) return 'javascript';
    return 'text';
  };

  return (
    <div className="w-full bg-white p-4 rounded shadow overflow-auto max-h-[500px]">
      <h4 className="font-semibold mb-3 text-indigo-700">{file.path}</h4>
      <SyntaxHighlighter language={getLanguage(file.path)} style={oneDark} customStyle={{ borderRadius: '8px' }}>
        {file.content}
      </SyntaxHighlighter>
    </div>
  );
}
