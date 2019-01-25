const jwt = require('jsonwebtoken');
const config = require('./../config/config');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// GetTokenFromMail
exports.getTokenFromMailUrl = (magicLinks) => {
  if (headers && headers.authorization) {
    let authorization = headers.authorization;
    let part = authorization.split(' ');
    if (part.length === 2 && part[0] === 'Bearer') {
      return part[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// Verifying token from the magiclinks
exports.verifyToken = (req, res, next) => {
  //condition to skip authentication
  if (false) {
    next();
  } else {

    // check header or url parameters or post parameters for token
    let token = this.getTokenFromMailUrl(req.headers);
    if (token) {
      let secretKey = process.env.APP_SECRET_KEY;
      jwt.verify(token, secretKey, (err, decoded) => {
        if (!decoded) {
          return res.status(400).send({
            'error': 'Failed to authenticate token.'
          });
        }
        mongoose.model('client')
          .findById(decoded._id)
          .exec()
          .then(clientData => {
            if (clientData) {
              if (bcrypt.compareSync(decoded.password, clientData.password) || err) {
                return res.status(403).send({
                  'error': 'Failed to authenticate token.'
                });
              } else {
                req.decodedToken = decoded;
                next();
              }
            } else {
              res.status(404).send({
                'error': 'Client Not Found'
              });
            }
          })
          .catch(error => {
            console.log(error.stack);
            res.status(500).send({
              'error': 'Internal Server Error'
            });
          });
      });
    } else {
      next();
    }
  }
};