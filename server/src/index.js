require('dotenv').config();        // loads variables from server/.env
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const basketRoutes = require('./routes/basket');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Auth routes

app.use('/auth', authRoutes);
app.use('/basket', basketRoutes);
// 

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
