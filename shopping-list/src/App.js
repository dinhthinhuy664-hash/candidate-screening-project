import React, { useState } from 'react';
import { 
  Container, Paper, Typography, TextField, IconButton, 
  Box, List, ListItem, ListItemText, Divider 
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const App = () => {
  const [items, setItems] = useState([]); 
  const [inputValue, setInputValue] = useState('');

  const handleAddButtonClick = () => {
    if (!inputValue.trim()) return; 
    
    const newItem = { 
      itemName: inputValue.trim(), 
      quantity: 1, 
      isSelected: false 
    };

    setItems([...items, newItem]); 
    setInputValue(''); 
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        MY SHOPPING LIST
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <TextField
            fullWidth
            label="What do you need to buy?"
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddButtonClick()}
          />
          <IconButton color="primary" onClick={handleAddButtonClick}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Box>

        <Divider />

        <List>
          {items.length === 0 ? (
            <Typography align="center" sx={{ py: 3, color: 'text.secondary' }}>
              Your list is empty. Start adding items!
            </Typography>
          ) : (
            items.map((item, index) => (
              <ListItem key={index} divider>
                <ListItemText 
                  primary={item.itemName} 
                  secondary={item.isSelected ? "Completed" : "Pending"}
                />
                <Typography variant="h6" sx={{ mr: 2, fontWeight: 'bold' }}>
                  {item.quantity}
                </Typography>
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default App;