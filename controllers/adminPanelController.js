const apply_get = (req, res) => {
	res.render('/adminPanel/apply', { user: req.session.user, title: "Apply" })
}

module.exports = {
	apply_get
};
