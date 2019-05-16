let express = require('express');
let router = express.Router();
var db = require('../db').db;
// let Admin = sequelize.import('../models/admin');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

router.post('/createadmin', function(req, res) {
  let username = req.body.admin.username;
  let pass = req.body.admin.password;
  // let code = req.body.user.admin;

 
  
    db.Admin.create({
      username: username,
      passwordhash: bcrypt.hashSync(pass, 10),
      // admin: code
    }).then((admin) => {
      var token = jwt.sign({id: admin.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
      
      res.json({
        admin: admin,
        message: 'created',
        sessionToken: token,
      });
    }, (err) => {
      res.send(500, err.message);
    }
    );
  });

router.post('/signinadmin', (req, res) => {
  db.Admin.findOne({where: {username: req.body.admin.username}}).then((admin) => {
    if(admin) {
      bcrypt.compare(req.body.admin.password, admin.passwordhash, (err, matches) => {
        if(matches) {
          let token = jwt.sign({id: admin.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})

          res.json({
            admin: admin,
            message: 'successfully authenticated',
            sessionToken: token
          });
        } else {
          res.status(502).send({error: 'error'});
        }
      })
    } else {
      res.status(500).send({error: 'Admin does not exist, please sign in with the right credentials'});
    }
  }, (err) => {
    res.status(501).send({error: 'failed'});
  })
})

// router.get('/getall', (req, res) => {
//   db.Restaurant.findAll({
//     attributes: ['id', 'name', 'typeOfFood', 'review', 'rating', 'userId']
//   }).then(function success(data) {
//     console.log(data);
//     res.json(data)
    
//   }).then(function err(err) {
//     res.send(500, err.message)
//   })
// })

module.exports = router;