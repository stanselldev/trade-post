require('log-timestamp');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const mongoose = require('mongoose');
const _ = require('lodash');

const {User} = require('./models/user');
const {Shift} = require('./models/shift');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TradePost', () => {
  console.log('Connected to database');
});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/shifts', (req, res) => {
  Shift.find().then((shifts) => {
    res.json(shifts);
  });
});

app.post('/shifts', (req, res) => {
  var shift = new Shift({
    name: req.body.name,
    date: req.body.date,
    start: req.body.start,
    end: req.body.end
  });

  shift.save().then((shift) => {
    res.status(201).json(shift);
  }, (e) => {
    res.status(400).send(e);
  })
});

app.delete('/shifts/:id', (req, res) => {
  var id = req.params.id;
  Shift.findOneAndRemove({
    _id: id
  }).then((shift) => {
    res.json(shift);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/shifts/:id', (req, res) => {
  var id = req.params.id;
  Shift.findOne({
    _id: id
  }).then((shift) => {
    res.json(shift);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.put('/shifts/:id', (req, res) => {
  var id = req.params.id;
  var request = new Shift({
    name: req.body.name,
    date: req.body.date,
    start: req.body.start,
    end: req.body.end
  });

  Shift.findOneAndUpdate({
    _id: id,
  }, {$push: {requests: request}}, {new: true}).then((shift) => {

    res.json(shift);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.put('/shifts/delete/:id/:request', (req, res) => {
  var id = req.params.id;
  var request = req.params.request;

  Shift.findOneAndUpdate({
    _id: id
  }, {$pull: {requests: {_id: request}}
}, {new: true}).then((doc) => {
    res.status(200).json(doc);
  }, (e) => {
    console.log(e);
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
