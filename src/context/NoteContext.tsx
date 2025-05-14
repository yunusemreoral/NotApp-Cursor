import { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../types';

interface NoteContextType {
  notes: Note[];
  addNote: (title: string, content: string, tags: string[]) => void;
  updateNote: (id: string, title: string, content: string, tags: string[]) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | undefined;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (title: string, content: string, tags: string[] = []) => {
    const now = new Date();
    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
      tags,
      createdAt: now,
      updatedAt: now,
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: string, title: string, content: string, tags: string[] = []) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, title, content, tags, updatedAt: new Date() }
          : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const getNote = (id: string) => {
    return notes.find((note) => note.id === id);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, getNote }}
    >
      {children}
    </NoteContext.Provider>
  );
}; 