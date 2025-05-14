import { useParams, Navigate } from 'react-router-dom';
import NoteForm from '../components/NoteForm';

export default function EditNotePage() {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <Navigate to="/" />;
  }
  
  return <NoteForm noteId={id} />;
} 