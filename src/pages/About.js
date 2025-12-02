import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Restaurant,
  Phone,
  Schedule
} from '@mui/icons-material';

const About = () => {
  const contactInfo = [
    { icon: <Phone />, title: 'Телефон', value: '+375 (33) 384-46-45' },
    { icon: <Schedule />, title: 'Режим работы', value: 'Ежедневно: 10:00 - 22:00' }
  ];

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mr: 2 }}>
            <Restaurant fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1">
              Контакты
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Шаурмичная
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Наши контакты
        </Typography>

        <List sx={{ width: '100%' }}>
          {contactInfo.map((item, index) => (
            <ListItem key={index} sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight="medium">
                    {item.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="body1" color="text.primary">
                    {item.value}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            Звоните, мы всегда рады вашим заказам!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;