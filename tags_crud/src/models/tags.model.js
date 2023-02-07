module.exports = (sequelize, Sequelize) => sequelize.define('tags', {
  post_id: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  tags: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});
