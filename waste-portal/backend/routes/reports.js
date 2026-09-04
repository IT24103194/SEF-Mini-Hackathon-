const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// POST /api/reports - create a new missed-pickup report
router.post('/', async (req, res) => {
  try {
    const { name, council, address, wasteType, description } = req.body;

    const report = new Report({ name, council, address, wasteType, description });
    const saved = await report.save();

    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error while saving report' });
  }
});

// GET /api/reports - list reports, most recent first
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, count: reports.length, data: reports });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error while fetching reports' });
  }
});

module.exports = router;
