module.exports = (sequelize, DataTypes) => {
  return sequelize.define('admin', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordhash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};