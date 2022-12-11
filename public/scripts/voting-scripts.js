function sendUpVote(postID, voteType) {
	let request = new XMLHttpRequest();
	const data = JSON.stringify({ postID: postID });
	console.log(data);
	if (voteType === 'upvote') {
		request.open('POST', 'http://localhost:3000/post/upvote', true);
	} else {
		request.open('POST', 'http://localhost:3000/post/downvote', true);
	}
	request.setRequestHeader('Content-Type', 'application/json');
	request.addEventListener('load', (event) => {
		const response = event.target;
		console.log(response);
		if (response.status === 200) {
			console.log('Success');
		} else {
			console.log('Error');
		}
	});

	request.send(data);
}
