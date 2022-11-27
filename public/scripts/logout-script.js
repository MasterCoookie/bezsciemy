window.addEventListener('load', () => {
	function logout() {
		const request = new XMLHttpRequest();

		request.addEventListener('load', (event) => {
			const response = JSON.parse(event.target.responseText);
			if (response.redirect) {
				window.location.href = response.redirect;
			}
		});

		request.addEventListener('error', (event) => {
			console.log('An error occured.');
		});

		request.open('POST', 'http://localhost:3000/logout', true);
		request.send();
	}
	const logoutBtn = document.getElementById('logout-btn');
	logoutBtn.addEventListener('click', (event) => {
		event.preventDefault();
		console.log(logoutBtn);
		logout();
	});
});
