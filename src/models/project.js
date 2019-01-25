const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  'projectName': {
    'type': String,
    'required': true
  },
  'owner': {
    'type': mongoose.Schema.Types.ObjectId,
    'ref': 'user'
  },
  'contributers': [{
    'type': mongoose.Schema.Types.ObjectId,
    'ref': 'user'
  }],
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
    'projectName': 1
  });

mongoose.model('project')
  .collection
  .createIndex({
    'owner': 1
  });

mongoose.model('project')
  .collection
  .createIndex({
    'contributers': 1
  });