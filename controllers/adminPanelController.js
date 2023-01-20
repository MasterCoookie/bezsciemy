const apply_get = (req, res) => {
	res.render('/adminPanel/apply', { user: req.session.user, title: "Apply" })
}

const apply_post = (req, res) => {
	res.sendStatus(501)
}

const review_post = (req, res) => {
	res.sendStatus(501)
}

const list_get = (req, res) => {
	res.render('/adminPanel/list', { user: req.session.user, title: "List" })
}

const review_get = (req, res) => {
	const review_id = req.query.id;
	res.render('/adminPanel/review', { user: req.session.user, title: "Review" })
}

module.exports = {
	apply_get,
	apply_post,
	list_get,
	review_get,
	review_post
};
