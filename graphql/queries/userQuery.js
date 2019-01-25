const dependencies = require('../../src/routes/routesDependencies').default;
let {
  userAllDetail,
} = require('../types/user');
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
  'type': new GraphQLList(userAllDetail),
  resolve() {
    const users = dependencies.userController.allUser();
    if (!users) {
      throw new Error('Error getting users');
    }
    return users;
  }
};

userByName = {
  'type': new GraphQLList(userAllDetail),
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
  'type': new GraphQLList(userAllDetail),
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