let express = require('express');
let router = express.Router();
let db = require('../db').db;
// let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

router.post('/createuser', function(req, res) {
  let username = req.body.user.username;
  let pass = req.body.user.password;
  
    db.User.create({
      username: username,
      passwordhash: bcrypt.hashSync(pass, 10),
    }).then((user) => {
      var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
      
      res.json({
        user: user,
        message: 'created',
        sessionToken: token,
      });
    }, (err) => {
      res.send(500, err.message);
    }
    );
  });

router.post('/signin', (req, res) => {
  db.User.findOne({where: {username: req.body.user.username}}).then((user) => {
    if(user) {
      bcrypt.compare(req.body.user.password, user.passwordhash, (err, matches) => {
        if(matches) {
          let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})

          res.json({
            user: user,
            message: 'successfully authenticated',
            sessionToken: token
          });
        } else {
          res.status(502).send({error: 'error'});
        }
      })
    } else {
      res.status(500).send({error: 'User does not exist, please sign in with the right credentials'});
    }
  }, (err) => {
    res.status(501).send({error: 'failed'});
  })
})

router.get('/getall', (req, res) => {
  db.Restaurant.findAll({
    attributes: ['id', 'name', 'typeOfFood', 'review', 'rating', 'userId']
  }).then(function success(data) {
    console.log(data);
    res.json(data)
    
  }).then(function err(err) {
    res.send(500, err)
  })
})

module.exports = router;