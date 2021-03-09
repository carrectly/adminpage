import React, {useState} from 'react'
import {Modal, Button, Form, Input, InputNumber} from 'antd'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {addServiceThunk} from '../../store/services'

function renderTooltip(props) {
	return (
		<Tooltip id='button-tooltip' {...props}>
			Click here to add a new service
		</Tooltip>
	)
}

const layout = {
	labelCol: {span: 8},
	wrapperCol: {span: 16},
}

const AddService = () => {
	const [form] = Form.useForm()
	const [show, setShow] = useState(false)
	const dispatch = useDispatch()

	const handleClose = () => {
		form.resetFields()
		setShow(false)
	}
	const handleShow = () => setShow(true)

	const onFinish = values => {
		dispatch(addServiceThunk(values))
		handleClose()
		form.resetFields()
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	const validateMessages = {
		required: '${label} is required!',
		types: {
			number: '${label} is not a valid number!',
		},
	}

	return (
		<div>
			<OverlayTrigger
				placement='top'
				delay={{show: 250, hide: 400}}
				overlay={renderTooltip}>
				<FontAwesomeIcon
					className='float-plus'
					onClick={() => handleShow(true)}
					icon={faPlusCircle}
				/>
			</OverlayTrigger>
			<Modal
				title='Add Service'
				visible={show}
				footer={null}
				closable={false}>
				<Form
					{...layout}
					form={form}
					name='control-hooks'
					size='large'
					validateMessages={validateMessages}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}>
					<Form.Item
						name='name'
						label='Service Name'
						rules={[{required: true}]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='price'
						label='Service Price'
						rules={[{required: true}, {type: 'number'}]}>
						<InputNumber />
					</Form.Item>
					<Form.Item name='description' label='Description'>
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

export default AddService
