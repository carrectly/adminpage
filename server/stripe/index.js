const router = require('express').Router()
const stripe = require('stripe')('sk_test_xuAO2kKxFAcc4bmggmiPCXYW00aQRcRhSh')

module.exports = router

const token = request.body.stripeToken(async () => {
	const charge = await stripe.charges.create({
		amount: 999,
		currency: 'usd',
		source: token,
		receipt_email: 'jenny.rosen@example.com',
	})
})()

;(async () => {
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 999,
		currency: 'usd',
		payment_method_types: ['card'],
		receipt_email: 'jenny.rosen@example.com',
	})
})()
