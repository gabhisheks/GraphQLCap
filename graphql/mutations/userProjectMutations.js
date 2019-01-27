const dependencies = require('../../src/routes/routesDependencies').default;
const {
  projectMailStatus,
} = require('../types/userProject');
const {
  GraphQLString,
} = require('graphql');

let userProjectMailStatus = {
  'type': projectMailStatus,
  'args': {
    'userId': {
      'name': 'mail id',
      'type': GraphQLString
    },
    'btnValue': {
      'name': 'button value',
      'type': GraphQLString
    }
  },
  async resolve(root, params) {
    if (!params.userId || !params.btnValue) {
      throw new Error('Error => args is incorrect.');
    }

    const newProject = await dependencies.userProjectController.userProjectMail(params);
    if (!newProject) {
      throw new Error('Error adding new project');
    }
    return newProject;
  }
};

exports.default = {
  userProjectMailStatus
};