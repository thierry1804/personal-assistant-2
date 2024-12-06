import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { Note } from '../../types';

interface NoteEditorProps {
  note?: Note;
  onSave: (title: string, content: string) => void;
  onClose: () => void;
}

export function NoteEditor({ note, onSave, onClose }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(title, content);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-0 w-full"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="p-2 text-green-600 hover:bg-green-50 rounded-md"
          >
            <Save className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your note..."
        className="w-full h-64 resize-none border-none focus:outline-none focus:ring-0"
      />
    </form>
  );
}