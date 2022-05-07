require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./database/database');
const routes = require('./routes');

// App
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

// Port
const PORT = process.env.PORT || 8080;

// MongoDB connection
connectDB();

// Routes
app.use(routes);

// Server running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
