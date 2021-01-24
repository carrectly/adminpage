export const getStatusArray = () => {
	return [
		'booked new',
		'booked us',
		'followed up - text',
		'followed up - call',
		'followed up - email',
		'cancelled',
		'confirmed',
		'in process',
		'pending work approvals',
		'ready to be returned',
		'returned',
		'quote inquired by customer',
		'quote sent to a shop',
		'quote sent to a customer',
		'invoiced',
		'paid',
		'postponed',
	]
}

export const getTakeActionStatusArray = () => {
	return [
		'booked new',
		'booked us',
		'followed up - text',
		'followed up - call',
		'followed up - email',
	]
}

export const getWorkZoneStatusArray = () => {
	return [
		'confirmed',
		'in process',
		'pending work approvals',
		'ready to be returned',
	]
}

export const getInvoicesStatusArray = () => {
	return ['returned', 'invoiced']
}

export const getQuotesStatusArray = () => {
	return [
		'quote inquired by customer',
		'quote sent to a shop',
		'quote sent to a customer',
	]
}

export const getPotentialLeadsStatusArray = () => {
	return ['postponed']
}
