import React from 'react'
import { render, Simulate } from 'react-testing-library'
import CommentFeed from './CommentFeed'

const createProps = props => ({
	header: 'Comment Feed',
	comments: [
		{
			id: 'comment-0',
			author: 'Ian Wilson',
			text: 'A boats a boat but a mystery box could be anything.',
			likes: ['user-0']
		},
		{
			id: 'comment-1',
			author: 'Max Powers Jr',
			text: 'Krypton sucks.',
			likes: []
		}
	],
	auth: {
		id: 'user-0',
		name: 'Ian Wilson'
	},
	createComment: jest.fn(),
	likeComment: jest.fn(),
	dislikeComment: jest.fn(),
	...props
})

describe('CommentFeed', () => {
	it('renders the comment feed', () => {
		let props = createProps()
		const { queryByText } = render(<CommentFeed {...props} />)
		const header = queryByText(props.header)
		expect(header.innerHTML).toBe(props.header)
	})

	it('renders the empty comment list', () => {
		let props = createProps({ comments: [] })
		const { container } = render(<CommentFeed {...props} />)
		const commentNodes = container.querySelectorAll('.Comment')
		expect(commentNodes.length).toBe(props.comments.length)
	})

	it('renders the comment list with some entries', () => {
		let props = createProps()
		const { container } = render(<CommentFeed {...props} />)
		const commentNodes = container.querySelectorAll('.Comment')
		expect(commentNodes.length).toBe(props.comments.length)
	})

	it('allows the user to add a comment', () => {
		// Arrange - create props and locate elements
		const newComment = { author: 'Socrates', text: 'Why?' }
		let props = createProps()
		const { container, getByLabelText } = render(
			<CommentFeed {...props} />
		)

		const authorNode = getByLabelText('Author')
		const textNode = getByLabelText('Comment')
		const formNode = container.querySelector('form')

		// Act - simulate changes to elements
		authorNode.value = newComment.author
		textNode.value = newComment.text

		Simulate.change(authorNode)
		Simulate.change(textNode)

		Simulate.submit(formNode)

		// Assert - check whether the desired functions were called
		expect(props.createComment).toHaveBeenCalledTimes(1)
		expect(props.createComment).toHaveBeenCalledWith(newComment)
	})

	it('allows the user to like a comment', () => {
		// Arrange - create props and locate elements
		let props = createProps()
		const { getByTestId } = render(<CommentFeed {...props} />)
		let id = props.comments[1].id

		// Act - simulate changes to elements
		const likeNode = getByTestId(id)
		Simulate.click(likeNode)

		// Assert - check whether the desired functions were called
		expect(props.likeComment).toHaveBeenCalledTimes(1)
		expect(props.likeComment).toHaveBeenCalledWith(id, props.auth)
	})

	it('allows the user to unlike a comment', () => {
		let props = createProps()
		let id = props.comments[0].id
		const { getByTestId } = render(<CommentFeed {...props} />)

		const likeNode = getByTestId(id)
		Simulate.click(likeNode)

		expect(props.dislikeComment).toHaveBeenCalledTimes(1)
		expect(props.dislikeComment).toHaveBeenCalledWith(
			id,
			props.auth
		)
	})
})
