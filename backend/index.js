const express = require('express'); // Require express
const cors = require('cors'); // Require cors
const connectToMongo = require('./db'); // Import your MongoDB connection function

const app = express(); // Initialize express app
const port = 5000;

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/auth', require('./routes/auth')); // Auth routes
app.use('/api/notes', require('./routes/notes')); // Notes routes

// Start the server
app.listen(port, () => {
  console.log(`iNotebook Backend listening on port ${port}`);
});
