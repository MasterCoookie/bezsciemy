window.addEventListener('load', () => {
	function sendData() {
		const request = new XMLHttpRequest();
		const formData = new FormData(registerForm);
		console.log(Array.from(formData.entries()));

		var firstPassword = formData.get('password');
		var repeatedPassword = formData.get('repeatPassword');
		console.log(firstPassword);
		console.log(repeatedPassword);

		request.open('PUT', '/auth/register', true);
		request.send(formData);
	}
	const registerForm = document.getElementById('registerForm');
	registerForm.addEventListener('submit', (event) => {
		event.preventDefault();
		sendData();
	});
});
