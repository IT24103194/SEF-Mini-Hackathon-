const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    council: {
      type: String,
      required: [true, 'Local council is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Street address is required'],
      minlength: [10, 'Address must be at least 10 characters'],
      trim: true,
    },
    wasteType: {
      type: String,
      required: [true, 'Waste type is required'],
      enum: ['Organic', 'Recyclable', 'E-Waste/Hazardous', 'General/Non-Recyclable'],
    },
    description: {
      type: String,
      required: [true, 'A short description is required'],
      minlength: [10, 'Description must be at least 10 characters'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Review', 'Resolved'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', ReportSchema);
