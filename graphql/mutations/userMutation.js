const dependencies = require('../../src/routes/routesDependencies').default;
const {
  userAllDetail,
  userLogin
} = require('../types/user');
const {
  GraphQLNonNull,
} = require('graphql');
let addUser;

addUser = {
  'type': userAllDetail,
  'args': {
    'register': {
      'name': 'register',
      'type': new GraphQLNonNull(userLogin)
    }
  },
  resolve(root, params) {
    const newUser = dependencies.userController.addUser(params.data);
    if (!newUser) {
      throw new Error('Error adding user');
    }
    return newUser;
  }
};

exports.default = {
  addUser
};