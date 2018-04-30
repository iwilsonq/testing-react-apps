import React from 'react'
import ReactDOM from 'react-dom'
import CommentFeed from './containers/CommentFeed'

const comments = [
	{
		author: 'Ian Wilson',
		text: 'A boats a boat but a mystery box could be anything.'
	},
	{
		author: 'Max Powers Jr',
		text: 'Krypton sucks.'
	},
	{
		author: 'Kent Beck',
		text: 'Red, Green, Refactor.'
	}
]

const createComment = (...args) => {
	console.log(...args)
}

const likeComment = (...args) => {
	console.log(...args)
}

const dislikeComment = (...args) => {
	console.log(...args)
}

const actions = {
	createComment,
	likeComment,
	dislikeComment
}

ReactDOM.render(
	<CommentFeed comments={comments} {...actions} />,
	document.getElementById('root')
)
