import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Paper, 
  Typography,
  TextField,
  Chip,
  Stack,
  IconButton,
  InputAdornment,
  Divider,
  Avatar,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LabelIcon from '@mui/icons-material/Label';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addNote, updateNote } from '../redux/noteSlice';
import { toast } from 'react-toastify';

interface NoteFormProps {
  noteId?: string;
}

export default function NoteForm({ noteId }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  const dispatch = useAppDispatch();
  const { notes } = useAppSelector((state) => state.notes);
  const navigate = useNavigate();
  const isEditMode = Boolean(noteId);

  useEffect(() => {
    if (noteId) {
      const note = notes.find(note => note.id === noteId);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setTags(note.tags || []);
      }
    }
  }, [noteId, notes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;
    
    if (isEditMode && noteId) {
      dispatch(updateNote({ id: noteId, title, content, tags }));
      toast.success('Not başarıyla güncellendi');
    } else {
      dispatch(addNote({ title, content, tags }));
      toast.success('Not başarıyla eklendi');
    }
    
    navigate('/');
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    // Aynı etiketi tekrar eklemeyi engelle
    if (!tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
    }
    
    setTagInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  // Rastgele bir renk seçimi yap (not ID'sine göre tutarlı)
  const getAvatarColor = () => {
    if (!isEditMode) return '#6366F1'; // Yeni not için varsayılan renk
    
    const colors = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#EF4444'];
    const hash = noteId!.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <Box sx={{ 
      height: 'calc(100vh - 80px)', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden',
      maxWidth: '800px',
      width: '100%',
      mx: 'auto'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/')}
          variant="outlined"
          color="inherit"
          size="small"
        >
          Geri
        </Button>
        <Box sx={{ flexGrow: 1, ml: 2 }}>
          <Typography variant="h5" fontWeight={600}>
            {isEditMode ? 'Notu Düzenle' : 'Yeni Not Ekle'}
          </Typography>
        </Box>
      </Box>
      
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
        }}
      >
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          noValidate 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: getAvatarColor(), mr: 2 }}>
              {isEditMode ? title.charAt(0).toUpperCase() : 'N'}
            </Avatar>
            <TextField
              required
              fullWidth
              id="title"
              label="Başlık"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              variant="standard"
              InputProps={{
                sx: { fontSize: '1.5rem', fontWeight: 600 }
              }}
            />
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <TextField
            required
            fullWidth
            name="content"
            label="İçerik"
            id="content"
            multiline
            sx={{ flexGrow: 1, mb: 3 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Not içeriğini buraya yazın..."
            variant="outlined"
          />

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <LabelIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
              Etiketler
            </Typography>
            
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                size="small"
                label="Etiket ekle"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                fullWidth
                placeholder="Etiket yazıp Enter'a basın"
                InputProps={{
                  endAdornment: tagInput && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={handleAddTag}
                        edge="end"
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
            
            {tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleDeleteTag(tag)}
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 1.5 }}
                  />
                ))}
              </Box>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              fullWidth
              startIcon={<SaveIcon />}
              size="large"
            >
              {isEditMode ? 'Güncelle' : 'Kaydet'}
            </Button>
            
            <Button 
              variant="outlined" 
              color="inherit"
              fullWidth
              onClick={() => navigate('/')}
              startIcon={<CloseIcon />}
              size="large"
            >
              İptal
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
} 