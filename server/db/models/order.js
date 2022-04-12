const Sequelize = require('sequelize');
const db = require('../database');
var axios = require('axios');
const Driver = require('./driver');
const Customer = require('./customer');
const moment = require('moment');

const Order = db.define('order', {
  hash: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'booked new',
  },
  customerComments: {
    type: Sequelize.TEXT,
  },
  pickupDate: {
    type: Sequelize.DATE,
    validate: {
      isDate: true,
    },
    allowNull: true,
  },
  dropoffDate: {
    type: Sequelize.DATE,
    validate: {
      isDate: true,
    },
    allowNull: true,
  },
  pickupLocation: {
    type: Sequelize.STRING,
  },
  carYear: {
    type: Sequelize.INTEGER,
  },
  carMake: {
    type: Sequelize.STRING,
  },
  carModel: {
    type: Sequelize.STRING,
  },
  carColor: {
    type: Sequelize.STRING,
  },
  vin: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  promoCode: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  discount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },
  isInCalendar: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  stickShift: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  flexibleOnTime: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

if (process.env.ENVIRONMENT === 'PRODUCTION') {
  const createInGoogle = async (inst) => {
    try {
      const customer = inst.customer.dataValues;
      let newinst = { ...inst.dataValues };
      newinst.customerName = `${customer.firstName} ${customer.lastName}`;
      if (inst._changed.pickUpDriverId) {
        const driver = await Driver.findByPk(newinst.pickUpDriverId);
        newinst.pickUpDriverEmail = driver.email;
        await axios.post(`${process.env.DOMAIN}/auth/google/calendar/newevent`, newinst);
      } else if (inst._changed.returnDriverId) {
        const driver = await Driver.findByPk(newinst.returnDriverId);
        newinst.returnDriverEmail = driver.email;
        await axios.post(`${process.env.DOMAIN}/auth/google/calendar/newevent`, newinst);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const sendEmail = async (inst) => {
    try {
      const newinst = { ...inst.dataValues };
      const customerObject = await Customer.findOne({
        where: { phoneNumber: newinst.customerPhoneNumber },
      });
      const cust = customerObject.dataValues;
      const orderInfo = { ...inst.dataValues };
      const payload = {
        email: cust.email,
        orderid: orderInfo.hash,
        make: orderInfo.carMake,
        model: orderInfo.carModel,
        year: orderInfo.carYear,
        customerName: `${cust.firstName} ${cust.lastName}`,
        pickupDate: moment(orderInfo.pickupDate).format('MM-DD-YY HH:00'),
        dropoffDate: moment(orderInfo.dropoffDate).format('MM-DD-YY HH:00'),
      };
      await axios.post(`${process.env.DOMAIN}/auth/google/gmail/sendconfirmation`, payload);
    } catch (err) {
      console.error(err);
    }
  };

  Order.afterCreate(sendEmail);
  Order.afterUpdate(createInGoogle);
}

module.exports = Order;
