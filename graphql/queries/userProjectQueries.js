const dependencies = require('../../src/routes/routesDependencies').default;
let {
  projectMailStatus,
} = require('../types/userProject');
let {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
let allUser,
  userByName,
  userById;


allUser = {
  'type': new GraphQLList(projectMailStatus),
  resolve() {
    const users = dependencies.userController.allUser();
    if (!users) {
      throw new Error('Error getting users');
    }
    return users;
  }
};

userByName = {
  'type': new GraphQLList(projectMailStatus),
  'args': {
    'name': {
      'name': 'user name',
      'type': GraphQLString
    }
  },
  resolve(root, params) {
    const users = dependencies.userController.userByName(params.name);
    if (!users) {
      throw new Error('Error getting users');
    }
    return users;
  }
};

userById = {
  'type': new GraphQLList(projectMailStatus),
  'args': {
    'id': {
      'name': 'ID',
      'type': new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params) {
    const users = dependencies.userController.userById(params.id);
    if (!users) {
      throw new Error('Error getting users');
    }
    return users;
  }
};

exports.default = {
  allUser,
  userByName,
  userById
};