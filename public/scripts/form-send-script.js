    function sendForm(path, formName) {
		const request = new XMLHttpRequest();
        const capturedForm = document.getElementById(formName);
		const formData = new FormData(capturedForm);
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

		request.addEventListener('error', (event) => {
			document.getElementById('message').innerHTML = 'An error occured.';
		});
        if(path === '/auth/changePassword') {
            var password = formData.get("newpassword");
            var repeatPassword = formData.get('repeatpassword');
            if(password === repeatPassword) {
                event.preventDefault();
                request.open('POST', path, true);
                request.send(formData);
            }
        }
        else if(path === '/auth/register'){
            console.log("register");
            event.preventDefault();
            request.open('PUT', '/auth/register', true);
            request.send(formData);
        }
        else {
            event.preventDefault();
            request.open('POST', path, true);
            request.send(formData);
        }
	}
