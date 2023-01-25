const User = require('../models/userModel');

const profile_get = async (req, res) => {
    
    try {
        const user = await User.findById(req.session.user.id)
        const postsCount = await user.getPostsCount();
        res.render('profileSettings/profile', { user: req.session.user, title: 'Profile' })
    } catch(e) {
        res.sendStatus(500);
        console.log(e);
    }
    
    
}

const settings_get = (req, res) => {
    res.render('profileSettings/settings', { user: req.session.user, title: 'Settings' })
}

module.exports = {
    profile_get,
    settings_get
}