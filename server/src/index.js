require('dotenv').config();        // loads variables from server/.env
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
  res.send('Hello from Express + PostgreSQL + Prisma server!');
});

// Auth routes (we'll create these shortly)
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
