require('dotenv').config();
let express = require('express');
let app = express();
let user = require('./controllers/usercontroller');
let restaurant = require('./controllers/restaurantcontroller');
let sequelize = require('./db');
let bodyParser = require('body-parser');

app.listen(3000, () => {
  console.log('hello'); 
});

sequelize.sync();

app.use(bodyParser.json());

app.use(require('./middleware/headers'));

app.use('/user', user);

//bellow this line are validated routes

app.use(require('./middleware/validate-session'));

app.use('/user/restaurant', restaurant);