const User = require('../models/user');

const view_get = async (req, res) => {
	//TODO find post by given id
	console.log(req.query.id);

	//tmp dummy data starts
	let today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const yyyy = today.getFullYear();

	today = mm + '/' + dd + '/' + yyyy;
	let post = {
		title: 'Test Title',
		created: today,
		fake: {
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
			links: [
				'https://www.youtube.com/watch?v=uKil0I93N9Y',
				'https://github.com/MasterCoookie/shopping-list/blob/master/controllers/authController.js',
				'https://www.baeldung.com/servlet-redirect-forward',
			],
			iframes: [
				'<iframe width="560" height="315" src="https://www.youtube.com/embed/uKil0I93N9Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
				'<iframe width="560" height="315" src="https://www.youtube.com/embed/7VBg7BXj1U0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
			],
			fake_images: [
				'fake_images-638b33296557bb5f840c6bd7-Test Title-mb.jpg',
				'fake_images-638b33296557bb5f840c6bd7-Test Title-tranzistor.png',
				'fake_images-638b33296557bb5f840c6bd7-Test Title-wp.png',
			],
		},
		debunk: {
			description:
				'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
			links: [
				'https://polsl-pl.zoom.us/j/97957219819?pwd=UHJRVHVIQzlPTEYwdjh3TlZHSEFidz09',
				'https://html.spec.whatwg.org/multipage/input.html',
			],
			iframes: [
				'<iframe width="560" height="315" src="https://www.youtube.com/embed/RQSBj2LKkWg?start=171" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
			],
			debunk_images: [
				'debunk_images-638b33296557bb5f840c6bd7-Test Title-jajo.png',
				'debunk_images-638b33296557bb5f840c6bd7-Test Title-me.png',
				'fake_images-638b33296557bb5f840c6bd7-test title-MACIBOL.png',
				'fake_images-638b33296557bb5f840c6bd7-test title-macibol1.png',
			],
		},
		author_id: '638b33296557bb5f840c6bd7',
		accepted_by: '638b33296557bb5f840c6bd7',
	};
	//tmp dummy data ends

	const author_user = await User.findOne({ _id: post.author_id });
	const accepted_user = await User.findOne({ _id: post.accepted_by });

	//TODO - unaccepted post technically should be visible too
	if (!author_user || !accepted_user) {
		res.send('Invalid post!');
	}

	//TODO: Implement view render using ejs
	res.render('post/postView', { post, author_user, accepted_user });
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

	res.send('done');
};

module.exports = {
	view_get,
	create_get,
	create_post,
};
