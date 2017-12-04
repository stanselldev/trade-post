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
  requests: [{
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
    }
  }]
});
// override objectID generation, auto increment
module.exports = {Shift};
