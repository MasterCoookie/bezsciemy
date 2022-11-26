const express = require('express');
const multer = require('multer');
const authController = require('../controllers/authController');

const upload = multer();

const router = express.Router();

router.get('/login', authController.login_get);
router.post('/login', upload.none(), authController.login_post);
router.post('/logout', authController.logout_post);
router.get('/register', authController.register_get);
router.put('/register', upload.none(), authController.register_put);

module.exports = router;