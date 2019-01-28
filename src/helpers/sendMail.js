// create mail transporter
let nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  "service": "gmail",
  "auth": {
    "user": process.env.EMAIL || 'abhishekg@prdxn.com',
    "pass": process.env.PASSWORD || 'prdxn2092018'
  }
});
let host = process.env.HOST || 'http://localhost:8089/api/app/capzone/';
const TAG = 'Error in sendMail file is =>';

exports.sendNewProjectMail = (recipient, tokenToSend, uidToSend, pidToSend) => {
  let mailOptions = {
    "from": "testing@gmail.com",
    "to": recipient,
    "subject": `Magic Link Testing :)`,
    "text": 'Hello! ' + recipient + '\n',
    "html": '<p>You can now access your account here: <a href="' + host + '?ptoken=' + tokenToSend + '&uid=' + uidToSend + '&pid=' + pidToSend + '">Visit Website</a> to submit new project.</p>'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(`${TAG} ${error}`);
      throw new Error('Email did not sent.');
    }
  });
  return {
    'Email': recipient,
    'status': 'Email successfully sent!'
  };
};