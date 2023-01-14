window.addEventListener('load', () => {
	function sendData() {
		const request = new XMLHttpRequest();
		const formData = new FormData(registerForm);
		console.log(Array.from(formData.entries()));

		var firstPassword = formData.get('password');
		var repeatedPassword = formData.get('repeatPassword');
		console.log(firstPassword);
		console.log(repeatedPassword);

		request.addEventListener('load', (event) => {
			const response = JSON.parse(event.target.responseText);
			if (response.redirect === 'login') {
				window.location.href = '/auth/login';
			} else {
				console.log(response);
				document.getElementById('message').innerHTML = response.msg;
			}
		});

		request.addEventListener('error', (event) => {
			document.getElementById('message').innerHTML = 'An error occured.';
		});

		request.open('PUT', '/auth/register', true);
		request.send(formData);
	}
	const registerForm = document.getElementById('registerForm');
	registerForm.addEventListener('submit', (event) => {
		event.preventDefault();
		sendData();
	});
});
