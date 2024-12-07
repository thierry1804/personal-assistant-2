import React from 'react';
import { StickyNote, Plus, Trash2 } from 'lucide-react';
import { Note } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface NoteListProps {
  notes: Note[];
  onAddNote: () => void;
  onDeleteNote: (noteId: string) => void;
}

export function NoteList({ notes, onAddNote, onDeleteNote }: NoteListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <StickyNote className="w-6 h-6 text-yellow-600" />
          <h2 className="text-xl font-semibold">Notes</h2>
        </div>
        <button
          onClick={onAddNote}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Note
        </button>
      </div>

      {notes.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No notes yet</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {notes.map(note => (
            <div
              key={note.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium">{note.title}</h3>
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-2 whitespace-pre-wrap">
                {note.content}
              </p>
              <p className="text-xs text-gray-500">
                Created {formatDate(note.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}