const require_login = (req, res, next) => {
	console.log(req.session);
	// console.log(store);
	if (req.session.authenticated) {
		next();
	} else {
		res.redirect('../auth/login');
	}
};



module.exports = {
	require_login,
};
