const require_login = (req, res, next) => {
	// console.log(req.session);
	if (req.session.authenticated) {
		next();
	} else {
		res.redirect('../auth/login');
	}
};

const require_redactor = (req, res, next) => {
	if(req.session.perm_lvl >= 2) {
		next();
	} else {
		res.sendStatus(403);
	}
}

const require_admin = (req, res, next) => {
	// console.log(req.session);
	if(req.session.user && req.session.user.perm_lvl >= 3) {
		next();
	} else {
		res.sendStatus(403);
	}
}

module.exports = {
	require_login,
	require_redactor,
	require_admin
};
