import { Grid, Typography, Box, Paper, InputBase, IconButton, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import NoteCard from '../components/NoteCard';
import { useAppSelector } from '../redux/hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { notes } = useAppSelector((state) => state.notes);
  const [searchQuery, setSearchQuery] = useState('');

  // Notları arama işlevi
  const filteredNotes = notes.filter(note => {
    const query = searchQuery.toLowerCase();
    const title = note.title.toLowerCase();
    const content = note.content.toLowerCase();
    const tags = note.tags.join(' ').toLowerCase();
    
    return title.includes(query) || content.includes(query) || tags.includes(query);
  });

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      maxWidth: '1200px',
      width: '100%',
      mx: 'auto'
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        mb: 3
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #6366F1 30%, #EC4899 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Notlarım
        </Typography>
        
        <Paper
          component="form"
          sx={{ 
            p: '2px 4px', 
            display: 'flex', 
            alignItems: 'center', 
            width: { xs: '100%', sm: 'auto', md: 300 },
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Notlarda ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="ara">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      
      {notes.length === 0 ? (
        <Paper 
          elevation={0}
          sx={{ 
            py: 8, 
            px: 4,
            textAlign: 'center',
            bgcolor: 'background.paper',
            borderRadius: 4,
            mt: 4,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <NoteAddIcon sx={{ fontSize: 60, color: 'primary.light', opacity: 0.7 }} />
          <Typography variant="h5" color="text.secondary" fontWeight={600}>
            Henüz not eklenmemiş
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Yeni not eklemek için sağ üstteki "Yeni Not" butonuna tıklayın
          </Typography>
        </Paper>
      ) : filteredNotes.length === 0 ? (
        <Paper 
          elevation={0}
          sx={{ 
            py: 6, 
            px: 4,
            textAlign: 'center',
            bgcolor: 'background.paper',
            borderRadius: 4,
            mt: 4,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <SearchIcon sx={{ fontSize: 60, color: 'primary.light', opacity: 0.7 }} />
          <Typography variant="h5" color="text.secondary" fontWeight={600}>
            Arama sonucu bulunamadı
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Farklı bir arama terimi deneyin veya tüm notları görmek için arama kutusunu temizleyin
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Grid container spacing={3}>
            {filteredNotes.map((note) => (
              <Grid item key={note.id} xs={12} sm={6} md={4}>
                <NoteCard note={note} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
} 