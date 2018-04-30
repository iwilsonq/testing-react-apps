import React, { Component } from 'react'
import Comment from '../components/Comment'

export default class CommentFeed extends Component {
	state = {
		author: '',
		text: ''
	}

	handleSubmit = event => {
		event.preventDefault()
		const { author, text } = this.state
		this.props.createComment({ author, text })
	}

	handleChange = event => {
		this.setState({ [event.target.id]: event.target.value })
	}

	handleLike = id => {
		this.props.likeComment(id, this.props.auth)
	}

	handleDislike = id => {
		this.props.dislikeComment(id, this.props.auth)
	}

	renderComments() {
		return this.props.comments.map((comment, i) => (
			<Comment
				key={i}
				{...comment}
				currentUser={this.props.auth}
				onDislike={this.handleDislike}
				onLike={this.handleLike}
			/>
		))
	}

	render() {
		const { header } = this.props
		return (
			<div className="CommentFeed">
				<h2>{header}</h2>

				<form
					className="comment-form"
					onSubmit={this.handleSubmit}
				>
					<label htmlFor="author">
						Author
						<input
							id="author"
							type="text"
							onChange={this.handleChange}
						/>
					</label>
					<label htmlFor="text">
						Comment
						<input
							id="text"
							type="text"
							onChange={this.handleChange}
						/>
					</label>
					<button type="submit">Submit Comment</button>
				</form>

				<div className="comment-list">
					{this.renderComments()}
				</div>
			</div>
		)
	}
}
