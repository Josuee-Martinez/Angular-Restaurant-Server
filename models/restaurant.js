module.exports = (sequelize, DataTypes) => {
  return sequelize.define('restaurant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeOfFood: {
      type: DataTypes.STRING,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    owner: {
      type: DataTypes.INTEGER
    }
  });
};