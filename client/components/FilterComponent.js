import React from 'react'
import {InputGroup, FormControl, Form} from 'react-bootstrap'

const FilterComponent = () => {
	return (
		<thead>
			<tr>
				<th>
					<InputGroup className='mb-3'>
						<FormControl
							placeholder='reset'
							aria-label='reset'
							aria-describedby='basic-addon1'
						/>
					</InputGroup>
				</th>
				<th>
					<InputGroup className='mb-3'>
						<FormControl
							placeholder='Username'
							aria-label='Username'
							aria-describedby='basic-addon1'
						/>
					</InputGroup>
				</th>
				<th>
					<InputGroup className='mb-3'>
						<FormControl
							placeholder='Username'
							aria-label='Username'
							aria-describedby='basic-addon1'
						/>
					</InputGroup>
				</th>
				<th>
					<InputGroup className='mb-3'>
						<FormControl
							placeholder='Username'
							aria-label='Username'
							aria-describedby='basic-addon1'
						/>
					</InputGroup>
				</th>
				<th>
					<InputGroup className='mb-3'>
						<FormControl
							placeholder='Username'
							aria-label='Username'
							aria-describedby='basic-addon1'
						/>
					</InputGroup>
				</th>
				<th>
					<InputGroup className='mb-3'>
						<FormControl
							placeholder='Username'
							aria-label='Username'
							aria-describedby='basic-addon1'
						/>
					</InputGroup>
				</th>
				<th>
					<InputGroup className='mb-3'>
						<FormControl
							placeholder='Username'
							aria-label='Username'
							aria-describedby='basic-addon1'
						/>
					</InputGroup>
				</th>
				<th>
					<Form.Group controlId='formBasicStarDate'>
						<Form.Control
							type='date'
							name='dateStart'
							// onChange={this.handleChange}
							// value={this.state.dateStart}
						/>
					</Form.Group>
				</th>
			</tr>
		</thead>
	)
}

export default FilterComponent
