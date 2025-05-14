import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  IconButton,
  Box,
  Chip,
  Avatar,
  CardHeader,
  CardActionArea,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Note } from '../types';
import { useAppDispatch } from '../redux/hooks';
import { deleteNote } from '../redux/noteSlice';
import { toast } from 'react-toastify';

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleEdit = () => {
    navigate(`/edit/${note.id}`);
  };

  const handleView = () => {
    navigate(`/note/${note.id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Bu notu silmek istediğinizden emin misiniz?')) {
      dispatch(deleteNote(note.id));
      toast.success('Not başarıyla silindi');
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
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: getAvatarColor() }}>
            {getInitial()}
          </Avatar>
        }
        title={stripHtml(note.title)}
        titleTypographyProps={{ 
          variant: 'h6', 
          noWrap: true,
          sx: { fontWeight: 600 }
        }}
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
            <AccessTimeIcon fontSize="small" sx={{ fontSize: '0.875rem', opacity: 0.7 }} />
            <Typography variant="caption" color="text.secondary">
              {formatDate(note.updatedAt)}
            </Typography>
          </Box>
        }
      />
      
      <CardActionArea onClick={handleView} sx={{ flexGrow: 1 }}>
        <CardContent sx={{ pt: 0 }}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              mb: 2
            }}
          >
            {stripHtml(note.content)}
          </Typography>
          
          {note.tags && note.tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {note.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: '4px' }}
                />
              ))}
            </Box>
          )}
        </CardContent>
      </CardActionArea>
      
      <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
        <Tooltip title="Görüntüle">
          <IconButton size="small" onClick={handleView} color="primary">
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Düzenle">
          <IconButton size="small" onClick={handleEdit} color="info">
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Sil">
          <IconButton size="small" onClick={handleDelete} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
} 