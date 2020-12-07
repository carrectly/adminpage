import React from 'react'
import {InputGroup, Form, Button} from 'react-bootstrap'

const FilterComponent = ({
	filterByDate,
	filterByName,
	filterByPhone,
	filterByCarMake,
	filterByCarModel,
	filterByLocation,
}) => {
	return (
		<thead>
			<tr>
				<th>
					<Button variant='primary'>Apply Filter</Button>
				</th>
				<th>
					<Button variant='danger'>Reset Filter</Button>
				</th>
				<th>
					<InputGroup className='mb-3'>
						<Form.Control type='input' onChange={filterByName} />
					</InputGroup>
				</th>
				<th>
					<InputGroup className='mb-3'>
						<Form.Control
							type='input'
							name='phone'
							onChange={filterByPhone}
						/>
					</InputGroup>
				</th>
				<th>
					<InputGroup className='mb-3'>
						<Form.Control type='input' onChange={filterByCarMake} />
					</InputGroup>
				</th>
				<th>
					<InputGroup className='mb-3'>
						<Form.Control
							type='input'
							name='dateStart'
							onChange={filterByCarModel}
						/>
					</InputGroup>
				</th>
				<th>
					<InputGroup className='mb-3'>
						<Form.Control
							type='input'
							name='dateStart'
							onChange={filterByLocation}
						/>
					</InputGroup>
				</th>
				<th>
					<Form.Group controlId='formBasicStarDate'>
						<Form.Control
							type='date'
							name='dateStart'
							onChange={filterByDate}
						/>
					</Form.Group>
				</th>
			</tr>
		</thead>
	)
}

export default FilterComponent
