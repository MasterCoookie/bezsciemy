function sendComment(postID) {
	const commentForm = document.getElementById('comment-form');
	const formData = new FormData(commentForm);
	formData.append('postID', postID);
	// console.log(postID);
	const request = new XMLHttpRequest();
	if(commentForm.content.length === 0) {
	request.addEventListener('load', (event) => {
		const response = JSON.parse(event.target.responseText);
		//console.log(response);
		document.getElementById('comment-message').innerHTML = response.msg;
	});
	request.open('PUT', '/post/comment');
	request.send(formData);
	}
	else {
		document.getElementById('comment-message').innerHTML = "You cannot send an empty comment!";
	}
	//console.log(formData.get('content'));
}

function sendReply(event, postID) {
	const replyForm = document.getElementById(event.target.form.id);
	const formData = new FormData(replyForm);
	formData.append('postID', postID);
	const request = new XMLHttpRequest();
	formData.append('fatherID', event.target.form.id);
	if(replyForm.content.length === 0) {
	request.addEventListener('load', (serverResponse) => {
		const response = JSON.parse(serverResponse.target.responseText);
		document.getElementById(
			'comment-message-' + event.target.form.id
		).innerHTML = response.msg;
	});
	request.open('PUT', '/post/comment');
	request.send(formData);
	}	
	else {
		document.getElementById('comment-message-' + event.target.form.id).innerHTML = "You cannot send an empty comment!";
	}
	//console.log(formData.get('content'));
}
