const User = require('../models/user');

const login_get = (req, res) => {
	if (!req.session.authenticated) {
		// console.log('unauth..ed');
		res.render('auth/login');
	} else {
		res.redirect('./protected/page');
		// console.log('auth..ed');
	}
};

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
				res.status(403).json({ msg: 'Invalid credentials' });
				res.end();
			}
		}
	} else {
		res.status(403).json({ msg: 'Invalid credentials' });
		res.end();
	}
};

const logout_post = (req, res) => {
	req.session.destroy();
	res.json({ redirect: '/login' });
};

const register_get = (req, res) => {
	if (!req.session.authenticated) {
		res.render('auth/register');
	} else {
		// console.log('auth..ed');
		res.redirect('./protected/page');
	}
};

const register_put = async (req, res) => {
	try {
		const { username, password, email } = req.body;
		const user = await User.create({ username, password, email });

		console.log("New user %s created", username);
		res.status(201);
		res.json({ redirect: 'login' });
		res.end();
	} catch (err) {
		// console.log(err);
		let error;
		Object.values(err.errors).forEach(({ properties }) => {
			// console.log(properties.message);
			if(properties.message) {
				error = properties.message;
			}
		});

		res.json({ msg: error });
		res.end();
	}
};

module.exports = {
	login_get,
	login_post,
	logout_post,
	register_put,
	register_get,
};
