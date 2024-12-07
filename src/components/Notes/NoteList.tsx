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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <StickyNote className="w-7 h-7 text-yellow-600" />
          <h2 className="text-2xl font-bold text-gray-900">Notes</h2>
        </div>
        <button
          onClick={onAddNote}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-lg hover:from-yellow-700 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          New Note
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="p-8 text-center">
          <StickyNote className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No notes yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map(note => (
            <div
              key={note.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{note.title}</h3>
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="p-1 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-3 whitespace-pre-wrap line-clamp-3">
                {note.content}
              </p>
              <p className="text-xs text-gray-400">
                Created {formatDate(note.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}