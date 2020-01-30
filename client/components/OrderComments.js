import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
	fetchCommentsThunk,
	addCommentThunk,
	clearCommentsThunk,
} from '../store/comments'
import {Form, Button, Table} from 'react-bootstrap'

class OrderComments extends Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)

		this.state = {
			content: '',
		}
	}

	async componentDidMount() {
		await this.props.getComments(this.props.id)
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		})
	}
	handleSubmit(evt) {
		evt.preventDefault()
		let id = this.props.id
		console.log('inside update form', id)
		this.props.addComment(id, this.state)
		this.setState({
			content: '',
		})
	}

	componentWillUnmount() {
		this.props.clearComments()
	}

	render() {
		const comments = this.props.comments || []
		return (
			<div className='commentbox'>
				<table className='commentlist'>
					<thead>
						<tr>
							<th>Date Created</th>
							<th>Special Comments</th>
						</tr>
					</thead>
					<tbody>
						{comments.map((comment, index) => (
							<tr key={index}>
								<td className='commentDate'>
									{new Date(comment.createdAt).toUTCString()}
								</td>
								<td className='content'>{comment.content}</td>
							</tr>
						))}

						<tr>
							<td colSpan='2'>
								<form
									className='commentform'
									onSubmit={this.handleSubmit}>
									<Button variant='primary' type='submit'>
										Add Comment
									</Button>
									<input
										className='commentinput'
										type='text'
										name='content'
										value={this.state.content}
										placeholder='Notes or comments related to this order'
										onChange={this.handleChange}
									/>
								</form>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		comments: state.comments,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getComments: id => dispatch(fetchCommentsThunk(id)),
		addComment: (id, obj) => dispatch(addCommentThunk(id, obj)),
		clearComments: () => dispatch(clearCommentsThunk()),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderComments)
