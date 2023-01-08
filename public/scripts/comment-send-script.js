function sendComment(postID) {
	const commentForm = document.getElementById('comment-form');
	const formData = new FormData(commentForm);
	formData.append('postID', postID);
	const request = new XMLHttpRequest();
	request.open('PUT', '/post/comment');
	request.send(formData);
	console.log(formData.get('content'));
}

function sendReply(event, postID) {
	const replyForm = document.getElementById(event.target.form.id);
	const formData = new FormData(replyForm);
	formData.append('postID', postID);
	const request = new XMLHttpRequest();
	formData.append('fatherID', event.target.form.id);
	request.open('PUT', '/post/comment');
	request.send(formData);
	console.log(formData.get('content'));
}
