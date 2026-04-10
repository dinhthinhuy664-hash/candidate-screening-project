import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, Typography, TextField, IconButton, 
  List, ListItem, ListItemText, Checkbox, 
  ListItemSecondaryAction, Alert, Divider, Box, Stack 
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const App = () => {
  const [items, setItems] = useState([]); 
  const [inputValue, setInputValue] = useState('');
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const total = items
      .filter(item => !item.isSelected)
      .reduce((sum, item) => sum + item.quantity, 0);
    setTotalItemCount(total);
  }, [items]);

  const handleAddButtonClick = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    const isDuplicate = items.some(
      (item) => item.itemName.toLowerCase() === trimmedValue.toLowerCase()
    );

    if (isDuplicate) {
      setError('This item is already in the list!');
      return;
    }

    const newItem = { 
      id: Date.now(),
      itemName: trimmedValue, 
      quantity: 1, 
      isSelected: false 
    };

    setItems([newItem, ...items]);
    setInputValue('');
    setError('');
  };

  const toggleComplete = (index) => {
    const newItems = [...items];
    newItems[index].isSelected = !newItems[index].isSelected;
    setItems(newItems);
  };

  const handleQuantityChange = (index, delta) => {
    const newItems = [...items];
    const newQty = newItems[index].quantity + delta;
    if (newQty >= 1) {
      newItems[index].quantity = newQty;
      setItems(newItems);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={10} sx={{ p: 4, borderRadius: 5, bgcolor: '#ffffff', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
          <ShoppingCartIcon color="primary" sx={{ fontSize: 45 }} />
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#1976d2', letterSpacing: '1px', textTransform: 'uppercase' }}>
            MY SHOPPING LIST
          </Typography>
        </Stack>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              label="What do you need to buy?"
              variant="outlined"
              value={inputValue}
              error={!!error}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (error) setError('');
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleAddButtonClick()}
            />
            <IconButton 
              color="primary" 
              onClick={handleAddButtonClick} 
              sx={{ 
                bgcolor: '#1976d2', 
                color: 'white',
                borderRadius: 3,
                width: 56,
                height: 56,
                '&:hover': { bgcolor: '#1565c0', transform: 'scale(1.05)' },
                transition: '0.2s'
              }}
            >
              <AddCircleIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Box>
          {error && <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>{error}</Alert>}
        </Box>

        <Divider sx={{ mb: 2 }} />

        <List sx={{ minHeight: '200px' }}>
          {items.length === 0 ? (
            <Typography align="center" color="text.secondary" sx={{ py: 8, fontStyle: 'italic', fontSize: '1.1rem' }}>
              Your list is empty. Start adding items!
            </Typography>
          ) : (
            items.map((item, index) => (
              <ListItem 
                key={item.id} 
                divider 
                sx={{ 
                  mb: 1.5, 
                  borderRadius: 3, 
                  bgcolor: item.isSelected ? '#f8f9fa' : '#ffffff',
                  border: '1px solid #f0f0f0',
                  boxShadow: item.isSelected ? 'none' : '0 2px 4px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease'
                }}
              >
                <Checkbox 
                  checked={item.isSelected} 
                  onChange={() => toggleComplete(index)}
                  color="success"
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
                
                <ListItemText 
                  primary={item.itemName} 
                  primaryTypographyProps={{ 
                    sx: { 
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      textDecoration: item.isSelected ? 'line-through' : 'none',
                      color: item.isSelected ? 'text.disabled' : 'text.primary'
                    } 
                  }}
                />

                <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center', pr: 1 }}>
                  <IconButton 
                    size="small" 
                    onClick={() => handleQuantityChange(index, -1)} 
                    disabled={item.isSelected}
                    sx={{ color: '#1976d2' }}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  
                  <Typography sx={{ mx: 1.5, fontWeight: 800, minWidth: '25px', textAlign: 'center', fontSize: '1.1rem' }}>
                    {item.quantity}
                  </Typography>
                  
                  <IconButton 
                    size="small" 
                    onClick={() => handleQuantityChange(index, 1)} 
                    disabled={item.isSelected}
                    sx={{ color: '#1976d2' }}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </List>

        <Box sx={{ 
          mt: 4, p: 3, 
          bgcolor: '#1976d2', 
          color: 'white',
          borderRadius: 4, 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 20px rgba(25, 118, 210, 0.4)'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 700, opacity: 0.9 }}>Total Items to Buy:</Typography>
          <Typography variant="h3" sx={{ fontWeight: 900 }}>
            {totalItemCount}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default App;