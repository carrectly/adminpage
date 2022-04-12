const Sequelize = require('sequelize');
const db = require('../database');

const Comment = db.define('comment', {
  content: {
    type: Sequelize.TEXT,
  },
  author: {
    type: Sequelize.STRING,
  },
});

module.exports = Comment;
