const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require('graphql');

exports.userAllDetail = new GraphQLObjectType({
  'name': 'Userdetail_all',
  'fields': () => ({
    '_id': {
      'type': new GraphQLNonNull(GraphQLID)
    },
    'userId': {
      'type': GraphQLString
    },
    'projects': {
      'type': new GraphQLList(GraphQLID)
    },
    'contributingProjects': {
      'type': new GraphQLList(GraphQLID)
    }
  })
});

exports.userLogin = new GraphQLInputObjectType({
  'name': 'Userdetail_email_name_address',
  'fields': () => ({
    'userId': {
      'type': GraphQLString
    },
    'status': {
      'type': GraphQLString
    }
  })
});
