function sendUpVote(postID, voteType) {
	let request = new XMLHttpRequest();
	const data = JSON.stringify({ postID: postID });
	console.log(data);
	if (voteType === 'upvote') {
		request.open('POST', '/post/upvote', true);
	} else {
		request.open('POST', '/post/downvote', true);
	}
	request.setRequestHeader('Content-Type', 'application/json');
	request.addEventListener('load', (event) => {
		const response = event.target;
		console.log(response);
		if (response.status === 200) {
			console.log('Success');
			document.getElementById('vote-message').innerHTML = 'Vote sent.';
		} else {
			console.log('Error');
			document.getElementById('vote-message').innerHTML =
				'You have to be loggin in first!.';
		}
	});

	request.send(data);
}
