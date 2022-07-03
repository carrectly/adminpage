const Sequelize = require('sequelize');
const db = require('../database');

const setWebsitePrice = (val) => {
  const value_to_send = String(val);
  if (val !== null && value_to_send.length > 0) {
    if (value_to_send.includes(',')) {
      return value_to_send.split(',').map(function (item) {
        return item.trim();
      });
    } else {
      return [value_to_send].map(function (item) {
        return item.trim();
      });
    }
  }
  return null;
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
