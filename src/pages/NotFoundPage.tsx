import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function NotFoundPage() {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Sayfa Bulunamadı
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Aradığınız sayfa bulunamadı veya taşınmış olabilir.
      </Typography>
      <Button 
        variant="contained" 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/')}
        sx={{ mt: 2 }}
      >
        Ana Sayfaya Dön
      </Button>
    </Box>
  );
} 