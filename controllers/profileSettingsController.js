const profile_get = (req, res) => {
    res.render('profileSettings/profile', { user: req.session.user, title: 'Profile' })
}

const settings_get = (req, res) => {
    res.render('profileSettings/settings', { user: req.session.user, title: 'Settings' })
}

module.exports = {
    profile_get,
    settings_get
}