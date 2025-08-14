const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    enum: ['Mridula', 'Ujjwal']
  },
  isPost: {
    type: Boolean,
    default: true
  },
  loves: {
    type: Number,
    default: 0
  },
  parentPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    required: function() { return !this.isPost; }
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }]
}, {
  timestamps: true
});

// Index for better query performance
messageSchema.index({ createdAt: -1 });
messageSchema.index({ isPost: 1, createdAt: -1 });
messageSchema.index({ parentPost: 1 });

module.exports = mongoose.model('Message', messageSchema);
