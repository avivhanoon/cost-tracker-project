const express = require('express');
const connectDB = require('./config/database');
const costRoutes = require('./routes/costRoutes');
const userRoutes = require('./routes/userRoutes')
require('dotenv').config();

const app = express();
//this is the Main app file. 
//Initializes the Express application, connects to the database, sets up middleware, and defines API routes.


// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', costRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));

module.exports = app;