import { useState, useEffect } from 'react';
import { Note } from '../types';

export function useNoteManager() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes);
      return parsedNotes.map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (title: string, content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      extractedTasks: [],
      extractedEvents: [],
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
  };

  const deleteNote = (noteId: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
  };

  return {
    notes,
    addNote,
    deleteNote,
  };
}