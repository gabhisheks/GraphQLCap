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
    'Email': {
      'name': 'Email',
      'type': GraphQLString
    },
    'btnValue': {
      'name': 'button value',
      'type': GraphQLString
    }
  },
  async resolve(root, params) {
    if (!params.Email || !params.btnValue) {
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