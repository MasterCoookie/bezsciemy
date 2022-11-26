window.addEventListener('load', () => {
	function sendData() {
		const request = new XMLHttpRequest();
		const formData = new FormData(registerForm);
		console.log(Array.from(formData.entries()));

		var firstPassword = formData.get('password');
		var repeatedPassword = formData.get('repeatPassword');
		console.log(firstPassword);
		console.log(repeatedPassword);
		if (firstPassword !== repeatedPassword) {
			document.getElementById('message').innerHTML =
				'Passwords do not match.<br>Please try again.';
		} else {
			request.addEventListener('load', (event) => {
				const response = JSON.parse(event.target.responseText);
				console.log(response);
				if (!response.message) {
					window.location.href = 'http://localhost:3000/login';
				} else {
					document.getElementById('message').innerHTML = response.message;
				}
			});

			request.addEventListener('error', (event) => {
				document.getElementById('message').innerHTML = 'An error occured.';
			});

			request.open('PUT', 'http://localhost:3000/register', true);
			request.send(formData);
		}
	}
	const registerForm = document.getElementById('registerForm');
	registerForm.addEventListener('submit', (event) => {
		event.preventDefault();
		sendData();
	});
});
