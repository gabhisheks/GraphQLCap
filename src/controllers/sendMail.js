
const utils = require('../helpers/utils');
const downloadEmailTemplate = require('../emailTemplate/accessProject');
const aws = require('aws-sdk');
const nodemailer = require('nodemailer');
const config = require('./../config/config');

exports.allowUsers = (userDetails) => {
	if (utils.checkIfDataExists(userDetails)) {
		exports.sendEmail({
			'to': userDetails.userEmailId,
			'subject': 'The wait is over',
			'html': downloadEmailTemplate()
		});
	}
};

exports.sendEmail = function ({
	to,
	from = 'xplr',
	cc,
	bcc,
	subject,
	message,
	altText,
	html,
	response
}) {
	let transporter = nodemailer.createTransport({
		'SES': new aws.SES({
			'accessKeyId': config.SES.key,
			'secretAccessKey': config.SES.secret,
			'region': config.SES.region
		}),
	});

	let mailOptions = {
		'from': from,
		'to': to,
		'subject': subject,
		'text': message,
		'html': html,
		'altText': altText,
		'cc': cc,
		'bcc': bcc,
		'headers': {
			'X-SES-CONFIGURATION-SET': 'Engagement'
		}
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			response ? response.send(error) : '';
		} else {
			response ? response.send('Email successfully sent!') : '';
		}
	});
};