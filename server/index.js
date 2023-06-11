const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');
const usersRoutes = require('./routes/users');

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Connect to database
sequelize.authenticate()
  .then(() => console.log('Connected to database'))
  .catch(error => console.error('Error connecting to database:', error));

// Set up middleware
app.use(express.urlencoded({ extended: false }));

// Set up routes
app.use('/api/users', usersRoutes);

// Start server
app.listen(3000, () => console.log('Server started on port 3000'));