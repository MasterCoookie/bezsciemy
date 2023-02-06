const express = require('express');
const multer = require('multer');
const authController = require('../controllers/authController');
const profileSettingsController = require('../controllers/profileSettingsController');

const upload = multer();

const router = express.Router();

router.get('/login', authController.login_get);
router.post('/login', upload.none(), authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/register', authController.register_get);
router.put('/register', upload.none(), authController.register_put);

router.post('/changeEmail', upload.none(), profileSettingsController.email_change_post);
router.post('/changePassword', upload.none(), profileSettingsController.password_change_post);

module.exports = router;