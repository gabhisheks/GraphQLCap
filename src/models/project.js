const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  'kindOfProject': {
    'type': String,
  },
  'projectName': {
    'type': String,
  },
  'projectDetail': {
    'type': String,
  },
  'publishStatus': {
    'type': String,
    'default': 'Unpublished'
  },
  'savedAs': {
    'type': String,
    'default': 'draft'
  }
}, {
  'timestamps': true
});

exports.default = mongoose.model('project', projectSchema);

mongoose.model('project')
  .collection
  .createIndex({
    'kindOfProject': 1
  });

mongoose.model('project')
  .collection
  .createIndex({
    'projectName': 1
  });