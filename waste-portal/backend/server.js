require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const reportsRouter = require('./routes/reports');
const classifyRouter = require('./routes/classify');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/waste-portal';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/reports', reportsRouter);
app.use('/api/classify', classifyRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'waste-portal-backend' });
});

// Connect to MongoDB then start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    // Start server anyway so /api/classify (no DB needed) still works during dev/demo
    app.listen(PORT, () =>
      console.log(`Server running WITHOUT DB on http://localhost:${PORT} (fix MONGO_URI to enable reports)`)
    );
  });
