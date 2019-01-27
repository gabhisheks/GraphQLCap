const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	'userId': {
		'type': String,
	},
}, {
	'timestamps': true
});

exports.default = mongoose.model('user', userSchema);

mongoose.model('user')
	.collection
	.createIndex({
		'userId': 1
	});