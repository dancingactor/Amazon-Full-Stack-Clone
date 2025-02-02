require('dotenv').config();        // loads variables from server/.env
const express = require('express');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const basketRoutes = require('./routes/basket');
const app = express();

// middleware 
app.use(cors());
app.use(express.json());

// Serve the React static files
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));

app.use('/auth', authRoutes);
app.use('/basket', basketRoutes);
 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html'));
});

// Start Server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
