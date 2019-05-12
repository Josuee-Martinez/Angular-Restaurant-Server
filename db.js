const Sequelize = require('sequelize');

const sequelize = new Sequelize('Angular-Project', 'postgres', 'unixpgadmin13', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate().then(() => console.log('Connected'), (err) => console.log(err));

// const User = sequellize.import('./models/user');

// //associate users with other table
// User.hasOne(Book);
// Book.belongsTo(User);

module.exports = sequelize;