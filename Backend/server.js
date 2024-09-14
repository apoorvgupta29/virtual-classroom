require('dotenv').config(); // Ensure this is at the very top

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const classRoutes = require('./routes/class');
const discussionRoutes = require('./routes/discussion');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/class', classRoutes);
app.use('/api/discussion', discussionRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Start server
const PORT = process.env.PORT || 5000;
app.listen();
