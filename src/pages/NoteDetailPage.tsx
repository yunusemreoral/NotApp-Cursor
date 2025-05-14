import { useParams, useNavigate } from 'react-router-dom';
import { 
  Paper, 
  Typography, 
  Box, 
  Button, 
  Divider,
  Chip,
  Container,
  IconButton,
  Avatar,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LabelIcon from '@mui/icons-material/Label';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { deleteNote } from '../redux/noteSlice';
import { toast } from 'react-toastify';

export default function NoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { notes } = useAppSelector((state) => state.notes);
  
  const note = id ? notes.find(note => note.id === id) : undefined;
  
  if (!note) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 8, 
        height: 'calc(100vh - 100px)', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center' 
      }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Not bulunamadı
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/')}
          sx={{ mt: 2, alignSelf: 'center' }}
        >
          Ana Sayfaya Dön
        </Button>
      </Box>
    );
  }
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleEdit = () => {
    navigate(`/edit/${note.id}`);
  };
  
  const handleDelete = () => {
    if (window.confirm('Bu notu silmek istediğinizden emin misiniz?')) {
      dispatch(deleteNote(note.id));
      toast.success('Not başarıyla silindi');
      navigate('/');
    }
  };

  // HTML etiketlerini kaldır
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Not başlığından avatar oluştur
  const getInitial = () => {
    const title = stripHtml(note.title);
    return title ? title.charAt(0).toUpperCase() : 'N';
  };

  // Rastgele bir renk seçimi yap (not ID'sine göre tutarlı)
  const getAvatarColor = () => {
    const colors = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#EF4444'];
    const hash = note.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
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
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Düzenle">
          <IconButton 
            color="primary" 
            onClick={handleEdit}
            sx={{ mr: 1 }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Sil">
          <IconButton 
            color="error" 
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: getAvatarColor(), mr: 2 }}>
            {getInitial()}
          </Avatar>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            {stripHtml(note.title)}
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          gap: 3,
          mb: 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {formatDate(note.updatedAt)}
            </Typography>
          </Box>
          
          {note.tags && note.tags.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              <LabelIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              {note.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: 1.5 }}
                />
              ))}
            </Box>
          )}
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ 
          flexGrow: 1, 
          overflow: 'auto', 
          pr: 1, 
          mr: -1,
          fontSize: '1.1rem',
          lineHeight: 1.6
        }}>
          <Typography 
            variant="body1" 
            paragraph 
            sx={{ 
              whiteSpace: 'pre-wrap',
              color: 'text.primary'
            }}
          >
            {stripHtml(note.content)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
} 