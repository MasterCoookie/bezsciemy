const User = require('../models/userModel');

const profile_get = async (req, res) => {
    
    try {
        const user = await User.findById(req.session.user.id)

        const postsCount = await user.getAcceptedPostsCount();

        let acceptedPostsCount;
        if(req.session.user.perm_lvl >= 2) {
            acceptedPostsCount = await user.getAcceptancesCount()
        }

        const votesCount = await user.getVotesCount();

        res.render('profileSettings/profile', {
            user: req.session.user,
            title: 'Profile',
            postsCount,
            acceptedPostsCount,
            votesCount
        })
    } catch(e) {
        res.sendStatus(500);
        console.log(e);
    }
}

const settings_get = (req, res) => {
    res.render('profileSettings/settings', { user: req.session.user, title: 'Settings' })
}

const password_change_post = async (req, res) => {
    try {
        const { oldpassword, newpassword, repeatpassword } = req.body;
        const user = await User.findById(req.session.user.id)
        await user.setNewPasswordAndSave(oldpassword, newpassword, repeatpassword);
        res.json({ msg: "password changed successfully" });
        //res.sendStatus(200);
    } catch(err) {
        let message;
        Object.values(err.errors).forEach(({ properties }) => {
            if(properties.message) {
                message = properties.message;
            }});
        res.status(403).json({ msg: message });
        //res.sendStatus(500);
    }
}

const email_change_post = async (req, res) => {
    try {
        const { newemail } = req.body;
        const user = await User.findByIdAndUpdate(req.session.user.id, {email: newemail}, {runValidators: true});
        res.json({ msg: "email changed successfully" });
        //res.sendStatus(200);
    } catch(err) {
        let message;
        if (err.code === 11000){
            message = "email already in use"
        } else {
            Object.values(err.errors).forEach(({ properties }) => {
                if(properties.message) {
                    message = properties.message;
                }});
            }
        res.status(403).json({ msg: message });
    }
}

module.exports = {
    password_change_post,
    email_change_post,
    profile_get,
    settings_get
}