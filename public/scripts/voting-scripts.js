function sendUpVote(postID) {
	let request = new XMLHttpRequest();
	const data = JSON.stringify({ postID: postID });
	console.log(data);
	request.open('POST', 'http://localhost:3000/post/upvote', true);
	request.setRequestHeader('Content-Type', 'application/json');
	/*request.onreadystatechange = function () {
		if (request.readyState === 200) {
			console.log('Success');
		} else {
			console.log('Error');
		}
	};*/
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
