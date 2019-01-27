const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectRelationSchema = new Schema({
    'ownerId': {
        'type': mongoose.Schema.Types.ObjectId,
        'ref': 'user'
    },
    'projectId': {
        'type': mongoose.Schema.Types.ObjectId,
        'ref': 'project'
    },
    'token': {
        'type': String,
        'required': true
    },
    'contributers': [{
        'type': mongoose.Schema.Types.ObjectId,
        'ref': 'user'
    }],
    'updatedBy': {
        'type': mongoose.Schema.Types.ObjectId,
        'ref': 'user'
    }
}, {
    'timestamps': true
});

exports.default = mongoose.model('projectrelation', projectRelationSchema);

mongoose.model('projectrelation')
    .collection
    .createIndex({
        'ownerId': 1
    });

mongoose.model('projectrelation')
    .collection
    .createIndex({
        'projectId': 1
    });

mongoose.model('projectrelation')
    .collection
    .createIndex({
        'token': 1
    });

mongoose.model('projectrelation')
    .collection
    .createIndex({
        'contributers': 1
    });

mongoose.model('projectrelation')
    .collection
    .createIndex({
        'updatedBy': 1
    });