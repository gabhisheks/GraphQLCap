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
    userId,
    btnValue
  } = params;

  if (checkIfDataExists(userId) && checkIfDataExists(btnValue) && btnValue === 'new') {
    // get userObj from database.
    userId = userId.trim();
    let userData = await mongoose.model('user').findOneAndUpdate({
      'userId': userId
    }, {
      '$set': {
        'userId': userId,
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
      // get projectToken, proejctId & userId.
      let ProjectRelation = mongoose.model('projectrelation');
      let result = await new ProjectRelation({
        'ownerId': userData._id,
        'projectId': newProjectData._id,
        'token': randomstring.generate(120)
      }).save();

      if (checkIfDataExists(result)) {
        console.log(`Inserted Successfully projectRelation data => ${result}`);
        // sent mail to userId.
        return sendNewProjectMail(userId, result.token, userData._id, newProjectData._id);
      }
    }
  } else if (checkIfDataExists(userId) && checkIfDataExists(btnValue) && btnValue === 'update') {
    return {
      'userId': userId,
      'status': 'prdxn is working on it.'
    };
  } else {
    return {
      'userId': userId,
      'status': 'Oops! somthing went wrong.'
    };
  }
};