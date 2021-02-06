import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {
	fetchCommentsThunk,
	addCommentThunk,
	clearCommentsThunk,
} from '../../store/comments'
import {Form, Input, Button, Select} from 'antd'
const {Option} = Select
import moment from 'moment'

const OrderComments = () => {
	const [form] = Form.useForm()
	const [author, setAuthor] = useState(false)

	const params = useParams()
	const id = params.orderid
	const orderComments = useSelector(state => state.comments)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCommentsThunk(id))
		return function cleanup() {
			dispatch(clearCommentsThunk())
		}
	}, [])

	const onFinish = values => {
		dispatch(addCommentThunk(id, values))
		form.resetFields()
		setAuthor(false)
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	const onChange = () => {
		setAuthor(true)
	}

	return (
		<div className='commentbox'>
			<table className='commentlist'>
				<thead>
					<tr>
						<th>Timestamp</th>
						<th>Internal Comments & Conversation</th>
					</tr>
				</thead>
				<tbody>
					{orderComments.map((comment, index) => (
						<tr key={index}>
							<td className='commentDate'>
								{comment.author ? comment.author : 'No author'}
								<br />
								{moment(comment.createdAt).format(
									'M/D/YY hh:mm A'
								)}
							</td>
							<td className='content'>{comment.content}</td>
						</tr>
					))}
					<tr>
						<td colSpan='2'>
							<Form
								form={form}
								name='control-hooks'
								layout='inline'
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}>
								<Form.Item name='content'>
									<Input placeholder='... enter new comment' />
								</Form.Item>
								<Form.Item name='author'>
									<Select
										style={{width: 200}}
										placeholder='Select a person'
										onChange={onChange}>
										<Option value='Vladimir'>
											Vladimir
										</Option>
										<Option value='Dragana'>Dragana</Option>
										<Option value='Taras'>Taras</Option>
										<Option value='Michael'>Michael</Option>
										<Option value='Stasik'>Stasik</Option>
									</Select>
								</Form.Item>
								<Form.Item>
									<Button
										type='primary'
										htmlType='submit'
										disabled={!author}>
										Add Comments
									</Button>
								</Form.Item>
							</Form>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default OrderComments
