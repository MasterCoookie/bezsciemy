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
	//todo: extend model
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

const User = mongoose.model('User', userSchema);

module.exports = User;
