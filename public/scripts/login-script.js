window.addEventListener('load', () => {
	function sendData() {
		const request = new XMLHttpRequest();
		const formData = new FormData(loginForm);
		console.log(Array.from(formData.entries()));
		console.log(request);
		request.addEventListener('load', (event) => {
			const response = JSON.parse(event.target.responseText);
			console.log(response);
			if (response.authenticated) {
				window.location.href = '/';
			} else {
				document.getElementById('message').innerHTML = 'Login failed.';
			}
		});

		request.addEventListener('error', (event) => {
			document.getElementById('message').innerHTML = 'An error occured.';
		});

		request.open('POST', '/auth/login', true);
		request.send(formData);
	}
	const loginForm = document.getElementById('loginForm');
	loginForm.addEventListener('submit', (event) => {
		event.preventDefault();
		sendData();
	});
});
