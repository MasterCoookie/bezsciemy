const view_get = (req, res) => {
	//TODO: Implement view render using ejs
	console.log(req.query.id);
	res.render('post/postEditor');
};

const create_get = (req, res) => {
	res.render('post/postEditor');
};

const create_post = (req, res, next) => {
	const {
		title,
		debunk_desc,
		debunk_links,
		debunk_images,
		debunk_iframes,
		fake_desc,
		fake_links,
		fake_images,
		fake_iframes,
	} = req.body;


	res.send("done");
};

module.exports = {
	view_get,
	create_get,
	create_post
};
