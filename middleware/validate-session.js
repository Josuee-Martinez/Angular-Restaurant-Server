let jwt = require('jsonwebtoken');
let sequelize = require('../db');
let db = require('../db').db;
// let User = sequelize.import('../models/user');

module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    next();
  } else {
    let sessionToken = req.headers.authorization;
    console.log(sessionToken);
    if(!sessionToken) return res.status(403).send({auth: false, message: 'No token provided'});
    else {
      jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
        if(decoded) {
          db.User.findOne({where: {id: decoded.id}}).then(user => {
            req.user = user;
            next();
          }, () => {
            res.status(401).send({error: 'not authorized'});
          })
        } else {
          res.status(400).send({error: 'not authorized'});
        }
      })
    }
  }
}