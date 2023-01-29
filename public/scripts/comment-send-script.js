function sendComment(postID, event = 1) {
	let commentForm;
	if(event !== 1) {
		commentForm = document.getElementById(event.target.form.id);
	}
	else {
		commentForm = document.getElementById("comment-form");
	}
	const formData = new FormData(commentForm);
	formData.append('postID', postID);
	if(event !== 1) {
		formData.append('fatherID', event.target.form.id);
	}
	const request = new XMLHttpRequest();
	if(commentForm.content.length !== 0) {
		request.addEventListener('load', (serverResponse) => {
			const response = JSON.parse(serverResponse.target.responseText);
			if(event === 1) {
				document.getElementById('comment-message').innerHTML = response.msg;
			}
			else {
				document.getElementById('comment-message-' + event.target.form.id).innerHTML = response.msg;
			}
		});
		request.open('PUT', '/post/comment');
		request.send(formData);
	}
	else {
		document.getElementById('comment-message').innerHTML = "You cannot send an empty comment!";
	}
}
