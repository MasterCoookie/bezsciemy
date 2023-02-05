const User = require('../models/userModel');
const Application = require('../models/applicationModel');

const fill_applications = async (applications) => {
	return await Promise.all(
		applications.map(async (application) => {
			// uncomment after getting form db
			application = application.toObject() // tu było typo
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

const apply_post = async (req, res) => {
	console.log(req.body);
	const { role, apptext } = req.body; 
	let application_perm_lvl;
	if (role === 'redactor' || role === 'redaktor') {
		application_perm_lvl = 2;
	} else if (role === 'admin') {
		application_perm_lvl = 3;
	} else {
		res.sendStatus(500).json({ msg: "incorrect role" });
	}
	try{
		const application = await Application.create({
			applier_id: req.session.user.id,
			application_perm_lvl,
			content: apptext
		});
		res.json({ msg: 'added successfully' });

	} catch (e) {
		res.json({ msg: e });
	}
};

const review_post = async (req, res) => {
	console.log(req.body);
	const { applicationID, approve } = req.body;
	let application = await Application.findById(applicationID)
	if (approve) {
		try {
			application.approveApplicationAndSave(req.session.user.id)
			res.sendStatus(200);
		} catch (e) {
			console.log(e);
			res.send(500);
		}
	} else {
		try{
			await Application.findByIdAndDelete(applicationID);
			res.sendStatus(200);
		} catch (e) {
			console.log(e);
			res.send(500);
		}
	}
};

const list_get = async (req, res) => {
	const applications = await Application.find({
			approved_by: { $exists: false }
		})
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
	try {
		const application = await Application.findById(review_id);
		
        const applier = await User.findById(application.applier_id);

        const postsCount = await applier.getAcceptedPostsCount();

		let acceptedPostsCount;
		if(application.application_perm_lvl >= 3) {
            acceptedPostsCount = await applier.getAcceptancesCount()
        }

        const votesCount = await applier.getVotesCount();
		
		res.render('adminPanel/review', {
			user: req.session.user,
			title: 'Review',
			applier,
			application,
			votesCount,
			acceptedPostsCount,
			postsCount,
		});
	}
	catch(e) {
        res.sendStatus(500);
        console.log(e);
    }
};

module.exports = {
	apply_get,
	apply_post,
	list_get,
	review_get,
	review_post,
};
