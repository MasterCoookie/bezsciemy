function formListener(formName, path) {
window.addEventListener('load', () => {
   function sendForm(path) {
		const request = new XMLHttpRequest();
		const formData = new FormData(capturedForm);
        if(path === '/auth/register') {
            var firstPassword = formData.get('passwordInput');
            var repeatedPassword = formData.get('repeatPasswordInput');
            
        }
        var firstPassword = formData.get('passwordInput');
		var repeatedPassword = formData.get('repeatPasswordInput');
		request.addEventListener('load', (event) => {
			const response = JSON.parse(event.target.responseText);
            if(path === '/auth/login') {
                if (response.authenticated) {
                    window.location.href = '/';
                } else {
                    document.getElementById('message').innerHTML = 'Login failed.';
                }
            }
            else if(path === '/auth/register') {
                if (response.redirect === 'login') {
                    window.location.href = '/auth/login';
                } else {
                    console.log(response);
                    document.getElementById('message').innerHTML = response.msg;
                }    
            }
            else if(path === '/auth/changePassword' || path === '/auth/changeEmail'){
                if (response.status === 200) {
                    document.getElementById('message').innerHTML = response.msg;
                }
                else {
                    document.getElementById('message').innerHTML = 'Something went wrong.';
                }
            }
		});


  
        if(path === '/auth/changePassword') {
            var password = formData.get("newpassword");
            var repeatPassword = formData.get('repeatpassword');
            if(password === repeatPassword) {
                request.open('POST', path, true);
                request.send(formData);
            }
            else {
                document.getElementById('message').innerHTML = "Both passwords are not matching.";
            }
        }
        else if(path === '/auth/register'){
        var firstPassword = formData.get('passwordInput');
		var repeatedPassword = formData.get('repeatPasswordInput');
            if(firstPassword === repeatedPassword) {
            request.open('PUT', '/auth/register', true);
            request.send(formData);
            }
            else {
                document.getElementById('message').innerHTML = "Both passwords are not matching.";
            }
        }
        else {
            request.open('POST', path, true);
            request.send(formData);
        }
	}
    const capturedForm = document.getElementById(formName);
	capturedForm.addEventListener('submit', (event) => {
		event.preventDefault();
		sendForm(path);
	});
});
}