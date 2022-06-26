const router = require('express').Router();
const { ApiError, Client, Environment } = require('square');

const client = new Client({
  timeout: 3000,
  environment:
    process.env.ENVIRONMENT === 'PRODUCTION' ? Environment.Production : Environment.Sandbox,
  accessToken: process.env.SQUARE_TOKEN,
});

const { ordersApi } = client;

const { invoicesApi } = client;

// var dueDate = moment().add(1, 'days').format('YYYY-MM-DD');

const invoiceDescription = `Hi there!

		We appreciate your business and glad we were able to help.
		Hope you liked the quality, simplicity, and convenience of our service.
		The concierge should have walked you through everything when the car was delivered, but please call or text us if you have any questions.
		__________

		Feedback:
		We are working on building a service that is easy to use and helpful to more Chicagoans, so if you've experienced any glitches, confusion, or have any suggestions for us  - please let us know so we can improve.
		If you are happy with the service, take a moment to write a review. As a small start-up, we are trying to gain visibility these are tremendously helpful to small businesses.
		Also, if you refer a friend, we will provide both of you with some discount. All they have to do is to mention you during the booking request.

		YELP: https://www.yelp.com/biz/carrectly-auto-care-chicago
		GOOGLE: http://bit.ly/2vloaPl

		Have a fantastic rest of the week! Thank you for servicing your car - Carrectly!`;

router.post('/', async (req, res, next) => {
  try {
    let order = req.body.obj;
    let customerid = req.body.id;
    let dueDate = req.body.due_date;
    let services = req.body.obj.services;
    let idempKey = `${order.hash}${Math.floor(Math.random() * 1000)}`;

    let lineItems = [];
    services.forEach((service) => {
      const itemPrice = Number(service.orderdetails.customerPrice);
      const priceInCents = itemPrice * 100;
      let amt = Number(priceInCents.toFixed(2));
      console.log('+++SETTING PRICE', amt);
      lineItems.push({
        name: service.name,
        quantity: '1',
        basePriceMoney: {
          amount: amt,
          currency: 'USD',
        },
      });
    });

    let orderBody = {
      locationId: process.env.SQUARE_LOCATION_ID,
      referenceId: order.hash,
      lineItems: lineItems,
      customerId: customerid,
    };

    let discountAmt = Number(order.discount) * 100;
    if (discountAmt) {
      const orderDiscount = [
        {
          amountMoney: {
            amount: discountAmt,
            currency: 'USD',
          },
          name: `${order.promoCode}`,
        },
      ];
      orderBody.discounts = orderDiscount;
    }

    let singleordr = await ordersApi.createOrder({
      idempotencyKey: idempKey,
      locationId: process.env.SQUARE_LOCATION_ID,
      order: orderBody,
    });

    const invoiceBody = {
      idempotencyKey: idempKey,
      invoice: {
        deliveryMethod: 'EMAIL',
        description: invoiceDescription,
        orderId: singleordr.result.order.id,
        locationId: process.env.SQUARE_LOCATION_ID,
        invoiceNumber: idempKey,
        title: `Thank you for servicing you car with us - Carrectly - ${order.hash}`,
        primaryRecipient: {
          customerId: customerid,
        },
        acceptedPaymentMethods: {
          card: true,
        },
        paymentRequests: [
          {
            requestType: 'BALANCE',
            dueDate: dueDate,
            tippingEnabled: true,
          },
        ],
      },
    };

    const { result } = await invoicesApi.createInvoice(invoiceBody);

    res.send({ id: result.invoice.id, status: 'Invoice created successfully' });
  } catch (error) {
    if (error instanceof ApiError) {
      console.log('Errors: ', error.errors);
    } else {
      console.log('Unexpected Error: ', error);
    }
    next(error);
  }
});

module.exports = router;
