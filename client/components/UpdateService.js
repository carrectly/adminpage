import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import {Modal, Button, Form, Input} from 'antd'

const layout = {
	labelCol: {span: 8},
	wrapperCol: {span: 16},
}

const UpdateService = props => {
	const [form] = Form.useForm()
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const onFinish = values => {
		console.log(props)
		console.log('values inside modal', values)
		props.updateService(props.service.id, values)
		handleClose()
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div>
			<Button type='primary' onClick={() => handleShow(true)}>
				Update
			</Button>
			<Modal title={`${props.service.name}`} visible={show} footer={null}>
				<Form
					{...layout}
					form={form}
					name='control-hooks'
					size='large'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}>
					<Form.Item
						name='name'
						label='Service Name'
						initialValue={`${props.service.name}`}
						rules={[{required: true}]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='price'
						label='Service Price'
						initialValue={props.service.price}
						rules={[{required: true}]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='description'
						label='Description'
						initialValue={props.service.description || ''}>
						<Input />
					</Form.Item>
					<Form.Item>
						<Button
							htmlType='button'
							type='secondary'
							onClick={handleClose}>
							Cancel
						</Button>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}

// class UpdateService extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.handleSubmit = this.handleSubmit.bind(this)
// 		this.handleChange = this.handleChange.bind(this)
// 		this.state = {
// 			name: '',
// 			price: '',
// 			description: '',
// 		}
// 	}

// 	handleChange(evt) {
// 		this.setState({
// 			[evt.target.name]: evt.target.value,
// 		})
// 	}
// 	handleSubmit(evt) {
// 		evt.preventDefault()
// 		let obj = {}
// 		if (this.state.name) {
// 			obj.name = this.state.name
// 		}
// 		if (this.state.price) {
// 			obj.price = this.state.price
// 		}
// 		if (this.state.description) {
// 			obj.description = this.state.description
// 		}
// 		this.props.updateService(evt.target.id, obj)
// 		obj = {}

// 		this.setState({
// 			name: '',
// 			price: '',
// 			description: '',
// 		})
// 	}

// 	render() {
// 		const service = this.props.service
// 		return (
// 			<td>
// 				<Table>
// 					<tbody>
// 						<tr>
// 							<td>
// 								<input
// 									className='priceupdateform2'
// 									name='name'
// 									type='text'
// 									placeholder='name'
// 									value={this.state.name}
// 									onChange={this.handleChange}
// 								/>
// 							</td>
// 							<td>
// 								<input
// 									className='priceupdateform'
// 									name='price'
// 									type='text'
// 									placeholder='price'
// 									value={this.state.price}
// 									onChange={this.handleChange}
// 								/>
// 							</td>
// 							<td>
// 								<input
// 									className='priceupdateform2'
// 									name='description'
// 									type='text'
// 									placeholder='description'
// 									value={this.state.description}
// 									onChange={this.handleChange}
// 								/>
// 							</td>
// 							<td>
// 								<Button
// 									id={service.id}
// 									type='button'
// 									onClick={evt => this.handleSubmit(evt)}>
// 									Update Service
// 								</Button>
// 							</td>
// 						</tr>
// 					</tbody>
// 				</Table>
// 			</td>
// 		)
// 	}
// }

export default UpdateService
