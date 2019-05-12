let router = require('express').Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let Restaurant = sequelize.import('../models/restaurant');

router.get('/', (req, res) => {
  let userid = req.user.id;

  Restaurant.findAll({where: {owner: userid}}).then(function findAllSucess(data) {
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
  
  Restaurant.create({
    name: name,
    typeOfFood: typeOfFood,
    review: review,
    rating: rating,
    owner: owner
  }).then(function createSuccess(restaurantdata) {
    res.json({
      restaurantdata: restaurantdata
    })
  }, function createError(err) {
    res.send(500, err.message)
  })
})

router.get('/:id', (req, res) => {
  let data = req.params.id
  let userid = req.user.id;

  Restaurant.findOne({where: {id: data, owner: userid}}).then(function findOneSuccess(data) {
    res.json(data);
  }, function findOneError(err) {
    res.send(500, err.message);
  })
})

router.delete('/:id', (req, res) => {
  let data = req.params.id;
  let userId = req.user.id;

  Restaurant.destroy({where: {id: data, owner: userId}}).then(function deleteSuccess() {
    res.send('Restaurant has been deleted');
  }, function deleteError(err) {
    res.send(500, err.message)
  })
})

module.exports = router;