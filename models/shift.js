const mongoose = require('mongoose');

var Shift = mongoose.model('Shift', {
  name: {
    required: true,
    type: String,
    minLength: 1,
    trim: true
  },
  date: {
    required: true,
    type: String,
    minLength: 1,
    trim: true
  },
  start: {
    required: true,
    type: String,
    minLength: 1,
    trim: true
  },
  end: {
    required: true,
    type: String,
    minLength: 1,
    trim: true
  },
  requests: {
    name: {
      type: String,
      minLength: 1,
      trim: true
    },
    date: {
      type: String,
      minLength: 1,
      trim: true
    },
    start: {
      type: String,
      minLength: 1,
      trim: true
    },
    end: {
      type: String,
      minLength: 1,
      trim: true
    }
  }
});

module.exports = {Shift};
