module.exports = (sequelize, Sequelize) => sequelize.define('tags', {
  tag: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  user_id: {
    type: Sequelize.STRING(255),
  },
});
