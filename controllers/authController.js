const User = require('../models/userModel');

const login_get = (req, res) => {
	if (!req.session.authenticated) {
		res.render('auth/login', { title: "Login" });
	} else {
		res.redirect('/');
	}
};

const login_post = async (req, res) => {
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
					req.session.user = { username, id: user._id, perm_lvl: user.permLevel };
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

const logout_get = (req, res) => {
	req.session.destroy();
	res.redirect('/');
};

const register_get = (req, res) => {
	if (!req.session.authenticated) {
		res.render('auth/register', { title: 'Register' });
	} else {
		res.redirect('/');
	}
};

const register_put = async (req, res) => {
	const { username, password, email } = req.body;

	User.init().then(async() => {
		try {
			const user = await User.create({ username, password, email });
			console.log("New user %s created", username);
			res.status(201);
			res.json({ redirect: 'login' });
			res.end();
		} catch (err) {
			let error;
			console.log(err);
			if (err.code === 11000){
				if (err.keyPattern.email){
					error = 'Email already in use'
				}
				else if (err.keyPattern.username){
					error = 'Username already in use'
				}
			} else {
				Object.values(err.errors).forEach(({ properties }) => {
				// console.log(properties.message);
				if(properties.message) {
					error = properties.message;
				}});
			}	
			res.json({ msg: error });
			res.end();
		}
	})


};

module.exports = {
	login_get,
	login_post,
	logout_get,
	register_put,
	register_get,
};
