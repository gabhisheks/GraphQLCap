const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	'userId': {
		'type': String,
	},
	'projects': [{
		'type': mongoose.Schema.Types.ObjectId,
		'ref': 'project'
	}],
	'contributingProjects': [{
		'type': mongoose.Schema.Types.ObjectId,
		'ref': 'project'
	}],
}, {
	'timestamps': true
});

exports.default = mongoose.model('user', userSchema);

mongoose.model('user')
	.collection
	.createIndex({
		'projects': 1
	});

mongoose.model('user')
	.collection
	.createIndex({
		'contributingProjects': 1
	});