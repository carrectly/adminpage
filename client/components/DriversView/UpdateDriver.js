import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {updateDriverThunk} from '../../store/drivers.js'
import {Modal, Button, Form, Input} from 'antd'
import {EditFilled} from '@ant-design/icons'

const layout = {
	labelCol: {span: 8},
	wrapperCol: {span: 16},
}

const UpdateDriver = props => {
	const [form] = Form.useForm()
	const [show, setShow] = useState(false)
	const dispatch = useDispatch()

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const onFinish = values => {
		dispatch(updateDriverThunk(props.driver.id, values))
		handleClose()
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div>
			<Button type='text' onClick={() => handleShow(true)}>
				<EditFilled style={{color: '#7CFC00'}} />
			</Button>
			<Modal
				title={`${props.driver.name}`}
				visible={show}
				footer={null}
				closable={false}>
				<Form
					{...layout}
					form={form}
					name='control-hooks'
					size='large'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}>
					<Form.Item
						name='name'
						label='Dealer Name'
						initialValue={`${props.driver.name}`}
						rules={[{required: true}]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='email'
						label='Email'
						initialValue={props.driver.email}
						rules={[{required: true}]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='phoneNumber'
						label='Phone number'
						initialValue={props.driver.phoneNumber}>
						<Input />
					</Form.Item>
					<Form.Item
						name='imageUrl'
						label='Image URL'
						initialValue={props.driver.imageUrl || ''}>
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

export default UpdateDriver
