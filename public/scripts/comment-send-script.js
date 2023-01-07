function sendComment(postID, ifReply) {
	const commentForm = document.getElementById('comment-form');
	const formData = new FormData(commentForm);
	formData.append('postID', postID);
	if (ifReply === 'no') {
		const request = new XMLHttpRequest();
		request.open('PUT', '/post/comment');
		request.send(formData);
	}
	console.log(formData.get('content'));
}
