function acceptPostScript(decision, postID) {
    let request = new XMLHttpRequest();
    const data = JSON.stringify({ postID: postID });
	console.log(postID);
    if (decision === 'accept') {
		request.open('POST', '/post/accept', true);
	} else {
		request.open('POST', '/post/delete', true);
	}

	request.addEventListener('load', (event) => {
		const response = event.target;
		console.log(response);
		if (response.status === 200) {
			if(decision === "accept")
			document.getElementById("postMessage").innerHTML = "Post accepted!";
			else {
			document.getElementById("postMessage").innerHTML = "Post deleted!";
			}
		} else {
			console.log('Error');
			document.getElementById("postMessage").innerHTML =
				"An unexpected error occurred.";
		}
	});
	request.send(data);

}