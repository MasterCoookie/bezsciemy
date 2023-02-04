function handleUserAction(redirect, messageFieldID , successMessage, ID = -1, ifApproved = -1) {
    let request = new XMLHttpRequest();
	var data;
	if(redirect !== '/administration/review') {
    data = JSON.stringify({ postID: ID });
	}
	else {
	data = JSON.stringify({applicationID: ID, approve: ifApproved});
	}
	request.open('POST', redirect, true); 
	request.setRequestHeader('Content-Type', 'application/json');
	request.addEventListener('load', (event) => {
		const response = event.target;
		console.log(response);
		if (response.status === 200) {
            if(redirect === "/post/upvote" || redirect === "/post/downvote") {
                if (response.responseURL.indexOf('/auth/login') === -1) {
                    const response = JSON.parse(event.target.responseText);
                    
                    document.getElementById('vote-counter').innerHTML = response.votes;
					
					const vote_status = response.vote_status;
					const arrow_highlight_class = "arrow-highlited";
					if(vote_status === 1) {
						document.getElementById('upvote').classList.add(arrow_highlight_class)
						document.getElementById('downvote').classList.remove(arrow_highlight_class)

						document.getElementById('vote-message').innerHTML = 'Vote sent.';
					} else if(vote_status === -1) {
						document.getElementById('upvote').classList.remove(arrow_highlight_class)
						document.getElementById('downvote').classList.add(arrow_highlight_class)

						document.getElementById('vote-message').innerHTML = 'Vote sent.';
					} else {
						document.getElementById('upvote').classList.remove(arrow_highlight_class)
						document.getElementById('downvote').classList.remove(arrow_highlight_class)

						document.getElementById('vote-message').innerHTML = 'Vote removed.';
					}
					
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
	console.log(data);
	//request.send(data);
}