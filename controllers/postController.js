const view_get = (req, res) => {
	//TODO: Implement view render using ejs
	res.send(req.query.id);
};

const create_get = (req, res) => {
	//TODO: Implement view render
	res.send("create");
};

const create_post = (req, res) => {

};

module.exports = {
	view_get,
	create_get,
	create_post
};
