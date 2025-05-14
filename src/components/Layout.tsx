import { ReactNode, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import NoteIcon from '@mui/icons-material/Note';
import Button from '@mui/material/Button';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerContent = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, mb: 2 }}>
        <Avatar 
          src="/favicon.svg"
          alt="Logo"
          sx={{ width: 32, height: 32, mr: 1.5 }}
        />
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            display: 'block',
            textDecoration: 'none', 
            color: 'primary.main',
            fontWeight: 'bold',
          }}
        >
          Not Uygulaması
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List>
        <ListItem button component={RouterLink} to="/" onClick={toggleDrawer}>
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Ana Sayfa" />
        </ListItem>
        <ListItem button component={RouterLink} to="/new" onClick={toggleDrawer}>
          <ListItemIcon>
            <AddIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Yeni Not" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      overflow: 'hidden',
      bgcolor: 'background.default'
    }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexGrow: 1
          }}>
            <Avatar 
              src="/favicon.svg"
              alt="Logo"
              sx={{ 
                width: 28, 
                height: 28, 
                mr: 1.5,
                display: { xs: 'none', sm: 'flex' }
              }}
            />
            <Typography 
              variant="h6" 
              component={RouterLink} 
              to="/" 
              sx={{ 
                textDecoration: 'none', 
                color: 'primary.main',
                fontWeight: 'bold',
                display: { xs: 'none', sm: 'block' },
                background: 'linear-gradient(45deg, #6366F1 30%, #EC4899 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Not Uygulaması
            </Typography>
          </Box>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button 
                component={RouterLink} 
                to="/" 
                color="inherit"
                startIcon={<HomeIcon />}
              >
                Ana Sayfa
              </Button>
            </Box>
          )}
          
          <Button 
            component={RouterLink} 
            to="/new" 
            variant="contained" 
            color="secondary" 
            startIcon={<AddIcon />}
            sx={{ ml: 2 }}
          >
            Yeni Not
          </Button>
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        {drawerContent}
      </Drawer>
      
      <Box sx={{ 
        p: { xs: 2, sm: 3 }, 
        flexGrow: 1, 
        overflow: 'auto',
        height: 'calc(100% - 64px)',
        display: 'flex',
        justifyContent: 'center',
        bgcolor: 'background.default'
      }}>
        <Container maxWidth="lg" sx={{ width: '100%' }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}