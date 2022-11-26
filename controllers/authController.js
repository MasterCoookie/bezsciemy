const login_get = (req, res) => {
	if (!req.session.authenticated) {
		console.log('unauth..ed');
		res.render('auth/login');
	} else {
		res.redirect('./protected/page');
		console.log('auth..ed');
	}
}

const login_post = async (req, res) => {
	//console.log(req.body);
	const { username, password } = req.body;

	if (username && password) {
		if (req.session.authenticated) {
			res.json({ redirect: '/' });
		} else {
			try {
				const user = await User.login(username, password);
				if (user) {
					console.log('OK');
					req.session.authenticated = true;
					req.session.user = { username };
					res.json(req.session);
				} else {
					res.status(403).json({ msg: 'Invalid credentials' });
					res.end();
				}
			} catch (err) {
				console.log(err);
			}
		}
	} else {
		res.status(403).json({ msg: 'Invalid credentials' });
		res.end();
	}
}

const logout_post = (req, res) => {
	req.session.destroy();
	res.json({ redirect: '/login' });
}

const register_put = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.create({ username, password });
		res.status(201);
		res.end();
	} catch (err) {
		console.log(err);
		res.status(500);
		res.end();
	}
}

module.exports = {
    login_get,
    login_post,
    logout_post,
    register_put
}