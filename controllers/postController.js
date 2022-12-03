const view_get = (req, res) => {
	//TODO: Implement view render using ejs
	console.log(req.query.id);
	res.render('post/postView');
};

const create_get = (req, res) => {
	res.render('post/postEditor');
};

const create_post = (req, res, next) => {
	//image uploading is handled via middleware
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

	//TODO create new post object and save it to db

	res.send("done");
};

module.exports = {
	view_get,
	create_get,
	create_post
};
