function handleUserAction(redirect, messageFieldID, successMessage, postID) {
    let request = new XMLHttpRequest();
    const data = JSON.stringify({ postID: postID });
	// console.log(data.toString());
		request.open('POST', redirect, true); 
	request.setRequestHeader('Content-Type', 'application/json');
	request.addEventListener('load', (event) => {
		const response = event.target;
		console.log(response);
		if (response.status === 200) {
            if(redirect === "/post/upvote" || redirect === "/post/downvote") {
                if (response.responseURL.indexOf('/auth/login') === -1) {
                    const response = JSON.parse(event.target.responseText);
                    document.getElementById('vote-message').innerHTML = 'Vote sent.';
                    document.getElementById('vote-counter').innerHTML = response.votes;
                } else {
                    document.getElementById('vote-message').innerHTML =
                        'You have to be logged in first!.';
                }
            }
            else {
			document.getElementById(messageFieldID).innerHTML = successMessage;
            }
            
		} else {
			console.log('Error');
			document.getElementById(messageFieldID).innerHTML =
				"An unexpected error occurred.";
		}
	});
	request.send(data);
}