const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require('graphql');

exports.projectMailStatus = new GraphQLObjectType({
  'name': 'mailStatus',
  'fields': () => ({
    '_id': {
      'type': new GraphQLNonNull(GraphQLID)
    },
    'Email': {
      'type': GraphQLString
    },
    'status': {
      'type': GraphQLString
    }
  })
});