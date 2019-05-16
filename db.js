const Sequelize = require('sequelize');

const sequelize = new Sequelize('Angular-Project', 'postgres', 'unixpgadmin13', {
  host: 'localhost',
  dialect: 'postgres'
});


sequelize.authenticate().then(() => console.log('Connected'), (err) => console.log(err));

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./models/user')(sequelize, Sequelize);
db.Restaurant = require('./models/restaurant')(sequelize, Sequelize);
db.Admin = require('./models/admin')(sequelize, Sequelize);


db.User.hasMany(db.Restaurant, {onDelete: 'cascade' });
db.Restaurant.belongsTo(db.User, { onDelete: 'cascade' });

module.exports = {
  db: db,
  sequelize: sequelize
};