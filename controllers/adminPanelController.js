const User = require('../models/userModel');

const fill_aplications = async aplications => {
	return await Promise.all(
		aplications.map(async (aplication) => {
			// uncomment after getting form db
			// aplication = aplication.toObject()
			let applier = await User.findById(aplication.applier_id);
			applier = applier.toObject()
			if (applier) {
				applier.password = undefined;
				applier._id = undefined;
				aplication.applier = applier;
			} else {
				aplication.applier = 'deleted';
			}

			return aplication;
		})
	);
}

const apply_get = (req, res) => {

	res.render('adminPanel/apply', { user: req.session.user, title: "Apply" })
}

const apply_post = (req, res) => {
	res.sendStatus(501);
};

const review_post = (req, res) => {
	res.sendStatus(501);
};

//tmp dummy data
const aplications = [
	{
		_id: "6383ae11ffafdd02c0b8b56x",
		aplication_perm_lvl: 2,
		applier_id: "6383ae11ffafdd02c0b8b563",
		content: "Admin dej redaktora pls, bede giga dobrym redaktorem i mam horom curke pls :((. btw sprzedam Opla"
	},
	{
		_id: "6383ae11ffafdd02c0b8b56z",
		aplication_perm_lvl: 3,
		applier_id: "6383af445323f013a20199ed",
		content: "Admin dej admina pls, bede giga dobrym adminem i mam horego synka Fifonża :(( a dotego mnie wykastrowali, więc sobie nie zrobię kolejnego :(("
	},
];

const list_get = async (req, res) => {
	const aplications_filled = await fill_aplications(aplications);
	
	console.log(aplications_filled);
	res.render('adminPanel/list', { user: req.session.user, title: "List", aplications: aplications_filled })
}

const review_get = async (req, res) => {
	const review_id = req.query.id;

	const aplications_filled = await fill_aplications(aplications);

	res.render('adminPanel/review', { user: req.session.user, title: "Review", aplication: aplications_filled[0] })
}

module.exports = {
	apply_get,
	apply_post,
	list_get,
	review_get,
	review_post,
};
