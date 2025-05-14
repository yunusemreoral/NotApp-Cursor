import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../types';

interface NoteState {
  notes: Note[];
}

const initialState: NoteState = {
  notes: [],
};

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<{ title: string; content: string; tags: string[] }>) => {
      const { title, content, tags } = action.payload;
      const now = new Date();
      const newNote: Note = {
        id: uuidv4(),
        title,
        content,
        tags,
        createdAt: now,
        updatedAt: now,
      };
      state.notes.push(newNote);
    },
    updateNote: (
      state,
      action: PayloadAction<{ id: string; title: string; content: string; tags: string[] }>
    ) => {
      const { id, title, content, tags } = action.payload;
      const noteIndex = state.notes.findIndex(note => note.id === id);
      if (noteIndex !== -1) {
        state.notes[noteIndex] = {
          ...state.notes[noteIndex],
          title,
          content,
          tags,
          updatedAt: new Date(),
        };
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
  },
});

export const { addNote, updateNote, deleteNote } = noteSlice.actions;

export default noteSlice.reducer; 