const User = require('../models/userModel');

const fill_applications = async (applications) => {
	return await Promise.all(
		applications.map(async (application) => {
			// uncomment after getting form db
			// aplication = aplication.toObject()
			let applier = await User.findById(application.applier_id);
			applier = applier.toObject();
			if (applier) {
				applier.password = undefined;
				applier._id = undefined;
				application.applier = applier;
			} else {
				application.applier = 'deleted';
			}

			return application;
		})
	);
};

const apply_get = (req, res) => {
	res.render('adminPanel/apply', { user: req.session.user, title: 'Apply' });
};

const apply_post = (req, res) => {
	res.sendStatus(501);
};

const review_post = (req, res) => {
	res.sendStatus(501);
};

//tmp dummy data
const applications = [
	{
		_id: '6383ae11ffafdd02c0b8b56x',
		application_perm_lvl: 2,
		applier_id: '6383ae11ffafdd02c0b8b563',
		content:
			'Admin dej redaktora pls, bede giga dobrym redaktorem i mam horom curke pls :((. btw sprzedam Opla',
	},
	{
		_id: '6383ae11ffafdd02c0b8b56z',
		application_perm_lvl: 3,
		applier_id: '6383af445323f013a20199ed',
		content:
			'Admin dej admina pls, bede giga dobrym adminem i mam horego synka Fifonża :(( a dotego mnie wykastrowali, więc sobie nie zrobię kolejnego :((',
	},
];

const list_get = async (req, res) => {
	const applications_filled = await fill_applications(applications);

	console.log(applications_filled);
	res.render('adminPanel/list', {
		user: req.session.user,
		title: 'List',
		applications: applications_filled,
	});
};

const review_get = async (req, res) => {
	const review_id = req.query.id;

	const applications_filled = await fill_applications(applications);

	res.render('adminPanel/review', {
		user: req.session.user,
		title: 'Review',
		application: applications_filled[0],
	});
};

module.exports = {
	apply_get,
	apply_post,
	list_get,
	review_get,
	review_post,
};
