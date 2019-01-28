const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	'Email': {
		'type': String,
	},
}, {
	'timestamps': true
});

exports.default = mongoose.model('user', userSchema);

mongoose.model('user')
	.collection
	.createIndex({
		'Email': 1
	});