const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const commentController = require('../controllers/commentController');

const view_get = async (req, res) => {
	const post_id = req.query.id;

	const post = await Post.findById(post_id);

	if (!post) {
		return res.sendStatus(404);
	}

	//dummy comments
	//not needed
	/*
	const comment_dummy_1 = {
		_id: 'asdfasdf',
		authorID: '6394aea53ef9e6a269925f82',
		postID: '6390eb28d94478039870ce56',
		fatherID: null,
		content: 'Nie zgadzam się z panem, bo pan je gupi jak paczka gwoździ',
	};

	const comment_dummy_2 = {
		_id: 'asdfasdf2',
		authorID: '6383b318e4c5926e80db2d6f',
		postID: '6390eb28d94478039870ce56',
		fatherID: 'asdfasdf',
		content:
			'A ja z panem, bo gwoździe to nie ludzie, nie mogą być gupie więc co pan',
	};

	const comment_dummy_3 = {
		_id: 'asdfasdf3',
		authorID: '6383b318e4c5926e80db2d6f',
		postID: '6390eb28d94478039870ce56',
		fatherID: null,
		content: 'Fajny post, pozdrawiam z całą rodzinką',
	};
	*/
	//DONE :) : read from db
	//let comments = [comment_dummy_1, comment_dummy_2, comment_dummy_3];

	let comments = await commentController.comments_get(post_id, 0);
	for (let i = 0; i < comments.length; i++) {
		const firstReply = await commentController.replies_get(comments[i]._id, -1);
		//console.log("=====================REPLY===========================")
		//console.log(firstReply)
		//console.log("=====================father_ID===========================")
		//console.log(comments[i]._id)
		//console.log("=========================================================")
		//console.log("=========================================================")
		if (firstReply.length > 0) {
			comments.splice(i + 1, 0, firstReply[0]);
			//console.log(comments)
			i++;
		}
		//console.log(comments)
	}
	const comments_filled = await Promise.all(
		comments.map(async (comment) => {
			comment = comment.toObject()
			let author = await User.findById(comment.authorID);
			author = author.toObject()
			if (author) {
				author.password = undefined;
				author._id = null;
				comment.author = author;
			} else {
				comment.author = 'deleted';
			}
			let parentComment = await Comment.findById(comment.fatherID);
			if (parentComment) {
				replying_to = await User.findById(parentComment.authorID);
				comment.father_id = parentComment._id
				comment.replying_to = replying_to.username
			}
			// comment._id = undefined;
			return comment;
		})
	);

	console.log(comments_filled)

	//tmp dummy data starts
	/*let today = new Date();
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
				'debunk_images-638b33296557bb5f840c6bd7-Test Title-jajo.png',
				'debunk_images-638b33296557bb5f840c6bd7-Test Title-me.png',
				'fake_images-638b33296557bb5f840c6bd7-test title-MACIBOL.png',
				'fake_images-638b33296557bb5f840c6bd7-test title-macibol1.png'
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
				'fake_images-638b33296557bb5f840c6bd7-test title-macibol1.png'
			],
		},
		author_id: '638b33296557bb5f840c6bd7',
		accepted_by: '638b33296557bb5f840c6bd7',
	};*/
	//tmp dummy data ends

	const author_user = await User.findOne({ _id: post.author_id });
	const accepted_user = await User.findOne({ _id: post.accepted_by });

	console.log(author_user);

	//TODO - unaccepted post technically should be visible too
	/*if (!author_user || !accepted_user) {
		res.send('Invalid post!');
	}*/

	res.render('post/postView', {
		post,
		author_user,
		accepted_user,
		comments: comments_filled,
		user: req.session.user,
		title: post.title
	});
};

const create_get = (req, res) => {
	res.render('post/postEditor', { user: req.session.user, title: "Create Post" } );
};

const create_post = async (req, res, next) => {
	//image uploading is handled via middleware
	const {
		title,
		debunk_desc,
		debunk_iframes,
		fake_desc,
		fake_iframes,
	} = req.body;

	let {
		debunk_links,
		fake_links
	} = req.body;

	debunk_links = debunk_links.split(/\r?\n/);
	fake_links = fake_links.split(/\r?\n/);

	let { debunk_images, fake_images } = req.files;
	//todo handle no images
	if(debunk_images) {
		debunk_images = debunk_images.map((image) => image.filename);
	}
	if(fake_images) {
		fake_images = fake_images.map((image) => image.filename);
	}
	
	// console.log(debunk_images);

	try {
		const post = await Post.create({
			title,
			author_id: req.session.user.id,
			debunk_desc,
			debunk_links,
			debunk_images,
			debunk_iframes,
			fake_desc,
			fake_links,
			fake_images,
			fake_iframes,
		});
		
		if (post) {
			//TODO MSG
			res.redirect('/')
		} else {
			res.send('dupa');
		}
	} catch (e) {
		res.send(e);
	}
};

const upvote_post = async (req, res) => {
	// console.log(req.body.postID);
	const post_id = req.body.postID;
	const post = await Post.findById(post_id);

	if (!post) {
		return res.sendStatus(404);
	}

	post.toggleUpVoteAndSave(req.session.user.id)
		.then(async () => {
			votes = await post.getSumOfVotes()
			res.json({ votes  })
		}).catch((err) => {
			console.log(err);
			res.sendStatus(500);
		});
};

const downvote_post = async (req, res) => {
	const post_id = req.body.postID;
	const post = await Post.findById(post_id);

	if (!post) {
		return res.sendStatus(404);
	}

	post.toggleDownVoteAndSave(req.session.user.id)
		.then(async () => {
			votes = await post.getSumOfVotes()
			res.json({ votes })
		}).catch((err) => {
			console.log(err);
			res.sendStatus(500);
		});
};

const accept_post = async (req, res) => {
	if (req.session.user && req.session.user.permLevel > 1){
		const post_id = req.body.postID;
		const post = await Post.findById(post_id);

		if (!post) {
			return res.sendStatus(404);
		}
		post.acceptPostAndSave(req.session.user.id)
	} else {
		res.sendStatus(403);
	}
};

const delete_post = async (req, res) => {
	if (req.session.user && req.session.user.permLevel > 1){
		const post_id = req.body.postID;
		try{
			await Post.deleteOne({ _id: post_id })
		} catch (e) {
			res.send(e);
		}
	} else {
		res.sendStatus(403);
	}
};

module.exports = {
	view_get,
	create_get,
	create_post,
	upvote_post,
	downvote_post,
	accept_post,
	delete_post
};
