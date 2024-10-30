import React from 'react';
import { Editor } from '@monaco-editor/react';
import { useStore } from '../store';

export function DocumentEditor() {
  const { currentDocument, updateDocument } = useStore();

  if (!currentDocument) return null;

  return (
    <div className="flex-1 overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="markdown"
        theme="vs-light"
        value={currentDocument.content}
        onChange={(value) => {
          if (value) updateDocument(currentDocument.id, value);
        }}
        options={{
          minimap: { enabled: false },
          wordWrap: 'on',
          lineNumbers: 'off',
          padding: { top: 16, bottom: 16 },
        }}
      />
    </div>
  );
}