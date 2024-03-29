const Post = require('./postModel');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const pwdValid = (password) => {
    if(/^\d+$/.test(password) || /^[a-zA-Z]+$/.test(password)) {
        return false;
    }
    if(password.toUpperCase() === password || password.toLowerCase() === password) {
        return false;
    }
    return true;
}

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Please enter a username'],
		unique: [true, 'Username already exists'],
		minlength: [3, 'Your username must be at least 3 characters long'],
		maxlength: [24, 'Your username must be shorter than 24 characters'],
	},
	email: {
		type: String,
		required: [true, 'Please enter an email'],
		unique: [true, 'Email is already used by another user'],
		validate: [isEmail, 'Please enter a valid email']
	},
	password: {
		type: String,
		required: [true, 'Please enter a password'],
		minlength: [8, 'Your password must be at least 8 characters long'],
		maxlength: [24, 'Your password must be shorter than 24 characters'],
		validate: [pwdValid, 'Your password must contain both letters (lowercase and uppercase) and numbers']
	},
	permLevel: {
		type: Number,
		default: 1
	}
});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function (_username, _password) {
	const user = await this.findOne({ username: _username });
	if (user) {
		if (await bcrypt.compare(_password, user.password)) {
			return user;
		}
		throw Error('Incorrect password');
	} else {
		throw Error('Invalid username');
	}
};

userSchema.methods.incrementPermissionLevel = async function (){
	if (this.permLevel < 3){
		this.permLevel = this.permLevel + 1;
	}
	await this.save();
}

// returns count of ACCEPETED posts created by user
userSchema.methods.getAcceptedPostsCount = async function () {
	return await Post.countDocuments({ author_id: this._id, accepted_by: { $exists: true } });
}

// returns count of all posts, that this user accepted
userSchema.methods.getAcceptancesCount = async function () {
	return await Post.countDocuments({ accepted_by: this._id });
}

userSchema.methods.getVotesCount = async function () {
	const upvotedPosts = await Post.countDocuments({ upVotes: this._id });
	const downvotedPosts = await Post.countDocuments({ downVotes: this._id });
	return upvotedPosts + downvotedPosts;
}

userSchema.methods.setNewEmailAndSave = async function (_email){
	this.email = _email
	await this.save();
}

userSchema.methods.setNewPasswordAndSave = async function (_oldPwd, _newPwd, _repPwd){
	if (await bcrypt.compare(_oldPwd, this.password)) {
		if(_newPwd === _repPwd){
			this.password = _newPwd
			await this.save();
		} else {
			throw Error('Passwords do not match');
		}
	} else {
		throw Error('Old password is incorrect');
	}
}

const User = mongoose.model('User', userSchema);

module.exports = User;
