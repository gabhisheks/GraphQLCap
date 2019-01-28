const mongoose = require('mongoose');
const randomstring = require("randomstring");
const {
  checkIfDataExists
} = require('../helpers/utils');
const {
  sendNewProjectMail
} = require('../helpers/sendMail');


exports.userProjectMail = async (params) => {
  let {
    Email,
    btnValue
  } = params;

  if (checkIfDataExists(Email) && checkIfDataExists(btnValue) && btnValue === 'new') {
    // get userObj from database.
    Email = Email.trim();
    let userData = await mongoose.model('user').findOneAndUpdate({
      'Email': Email
    }, {
      '$set': {
        'Email': Email,
      }
    }, {
      'upsert': true,
      'new': true,
    }).exec();

    // get newProjectObj from database.
    let NewProject = mongoose.model('project');
    let newProjectData = await new NewProject({
      'kindOfProject': '',
      'projectName': '',
      'projectDetail': '',
      'publishStatus': '',
      'savedAs': ''
    }).save();

    if (checkIfDataExists(newProjectData) && checkIfDataExists(userData)) {
      // get projectToken, proejctId & Email.
      let ProjectRelation = mongoose.model('projectrelation');
      let result = await new ProjectRelation({
        'ownerId': userData._id,
        'projectId': newProjectData._id,
        'token': randomstring.generate(120)
      }).save();

      if (checkIfDataExists(result)) {
        console.log(`Inserted Successfully projectRelation data => ${result}`);
        // sent mail to Email.
        return sendNewProjectMail(Email, result.token, userData._id, newProjectData._id);
      }
    }
  } else if (checkIfDataExists(Email) && checkIfDataExists(btnValue) && btnValue === 'update') {
    return {
      'Email': Email,
      'status': 'prdxn is working on it.'
    };
  } else {
    return {
      'Email': Email,
      'status': 'Oops! somthing went wrong.'
    };
  }
};