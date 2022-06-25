const Sequelize = require('sequelize');
const db = require('../database');

const setWebsitePrice = (val) => {
  if (val) {
    if (val.includes(',')) {
      return val.split(',').map(function (item) {
        return item.trim();
      });
    } else {
      return [val].map(function (item) {
        return item.trim();
      });
    }
  }
  return [];
};

const Service = db.define('service', {
  name: Sequelize.STRING,
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  description: Sequelize.TEXT,
  short_description: Sequelize.TEXT,
  long_description: Sequelize.TEXT,
  is_show_user: Sequelize.BOOLEAN,
  duration: Sequelize.STRING,
  price_customer: {
    type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
    set(val) {
      this.setDataValue('price_customer', setWebsitePrice(val));
    },
  },
});

module.exports = Service;
