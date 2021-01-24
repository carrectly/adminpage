import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {
	fetchCommentsThunk,
	addCommentThunk,
	clearCommentsThunk,
} from '../store/comments'
import {Form, Input, Button} from 'antd'
import moment from 'moment'

const OrderComments = () => {
	const [form] = Form.useForm()

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
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div className='commentbox'>
			<table className='commentlist'>
				<thead>
					<tr>
						<th>Created</th>
						<th>Special Comments</th>
					</tr>
				</thead>
				<tbody>
					{orderComments.map((comment, index) => (
						<tr key={index}>
							<td className='commentDate'>
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
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}>
								<Form.Item label='New comment' name='content'>
									<Input />
								</Form.Item>
								<Form.Item>
									<Button type='primary' htmlType='submit'>
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
