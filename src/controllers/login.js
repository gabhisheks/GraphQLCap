//Register Controller
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const signToken = require('./../helpers/token').signToken;
const {
  checkIfDataExists
} = require('./../helpers/utils');

//Generates jwt token for authentication
exports.signin = (req, res) => {
  mongoose.model('client')
    .findOne({
      'username': req.body.username,
      'clientname': req.body.clientname
    })
    .exec()
    .then(clientData => {
      if (clientData) {
        if (bcrypt.compareSync(req.body.password.trim(), clientData.password)) {
          res.send({
            'auth': true,
            'clientname': clientData.clientname,
            'authToken': signToken({
              '_id': clientData._id,
              'clientname': clientData.clientname,
              'username': clientData.username,
              'password': clientData.password,
              'isAdmin': clientData.isAdmin
            })
          });
        } else {
          res.status(403).send('Please check your username/password');
        }
      } else {
        res.status(404).send({
          'error': 'Client Not Found'
        });
      }
    })
    .catch(err => {
      console.log(err.stack);
      res.status(500).send('Internal Server Error');
    });
};