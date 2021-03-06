let router = require('express').Router();
let sequelize = require('../db');
let db = require('../db').db;
// let User = sequelize.import('../models/user');
// let Restaurant = sequelize.import('../models/restaurant');

router.get('/', (req, res) => {
  let userid = req.user.id;

  db.Restaurant.findAll({where: {owner: userid}}).then(function findAllSucess(data) {
    res.json(data)
  }, function findAllError(err) {
    res.send(500, err.message)
  })
})

router.post('/', (req, res) => {
  let name = req.body.restaurant.name;
  let typeOfFood = req.body.restaurant.typeOfFood;
  let review = req.body.restaurant.review;
  let rating = req.body.restaurant.rating;
  let owner = req.user.id;
  
  db.Restaurant.create({
    name: name,
    typeOfFood: typeOfFood,
    review: review,
    rating: rating,
    owner: owner,
    userId: owner
  }).then(function createSuccess(restaurantdata) {
    res.json({
      restaurantdata: restaurantdata,     
    })
  }, function createError(err) {
    res.send(500, err.message)
  })
})

router.get('/:id', (req, res) => {
  let data = req.params.id
  let userid = req.user.id;

  db.Restaurant.findOne({where: {id: data, owner: userid}}).then(function findOneSuccess(data) {
    res.json(data);
  }, function findOneError(err) {
    res.send(500, err.message);
  })
})

router.delete('/:id', (req, res) => {
  let data = req.params.id;
  let userId = req.user.id;

  db.Restaurant.destroy({where: {id: data}}).then(function deleteSuccess() {
    res.send('Restaurant has been deleted');
  }, function deleteError(err) {
    res.send(500, err.message)
  })
})

router.put('/:id', (req, res) => {
  let newId = req.params.id;
  let newName = req.body.restaurant.name;
  let newTypeOfFood = req.body.restaurant.typeOfFood;
  let newReview = req.body.restaurant.review;
  let newRating = req.body.restaurant.rating;
  let newOwner = req.user.id

  db.Restaurant.update({
    name: newName,
    typeOfFood: newTypeOfFood,
    review: newReview,
    rating: newRating,
    owner: newOwner
  }, {where: {id: newId}}).then(function updated() {
    res.json({
      name: newName,
      typeOfFood: newTypeOfFood,
      review: newReview,
      rating: newRating,
      owner: newOwner
    })
  }, function updateError(err) {
    res.send(500, err.message)
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

router.delete('/deleteadmin/:id', (req, res) => {
  let data = req.params.id;

  db.Restaurant.destroy({where: {id: data}}).then(function deleteSuccess() {
    res.send('Restaurant has been deleted');
  }, function deleteError(err) {
    res.send(500, err.message)
  })
})

module.exports = router;