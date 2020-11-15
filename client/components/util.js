export const getStatusArray = () => {
	return [
		'booked',
		'quote',
		'quoted',
		'in process',
		'returned',
		'invoiced',
		'done',
		'cancelled',
	]
}

export const getActiveStatusArray = () => {
	return ['booked', 'quote', 'quoted', 'in process', 'returned', 'invoiced']
}

export const getCompletedStatusArray = () => {
	return ['done', 'cancelled']
}
