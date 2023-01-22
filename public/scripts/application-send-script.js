function sendApplication() {
	const applicationForm = document.getElementById('application-form');
	const formData = new FormData(applicationForm);
	const request = new XMLHttpRequest();
	request.addEventListener('load', (serverResponse) => {
		const response = serverResponse.target;
		//const response = JSON.parse(serverResponse.target.responseText);
		if (response.status === 200) {
			document.getElementById('application-form').reset();
			document.getElementById('application-message').innerHTML =
				'Application sent succesfully.';
		} else {
			document.getElementById('application-message').innerHTML =
				'Something went wrong.';
		}
	});
	console.log(formData);
	event.preventDefault();
	request.open('POST', '/administration/apply');
	request.send(formData);
	//console.log(formData.get('content'));
}
