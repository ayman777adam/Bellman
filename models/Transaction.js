// models/Transaction.js

const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  box: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Box', 
    required: true 
  },
  amount: {
    type: Number,
    required: true
  },
  // نوع الحركة: 'deposit' فقط
  type: {
    type: String,
    enum: ['deposit'], // <-- تم حذف 'withdrawal'
    required: true
  },
  description: {
    type: String,
    trim: true,
    default: 'No description'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);