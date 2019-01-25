const express = require('express');
const router = new express.Router();
const graphqlHTTP = require('express-graphql');
const schema = require('../../graphql').default;

/**
 * All APP API's would be listed below */
router.use('/graphql', graphqlHTTP(() => ({
  'schema': schema,
  'graphiql': true,
  'pretty': true
})));

module.exports = router;