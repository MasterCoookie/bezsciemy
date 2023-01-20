const express = require('express');
const multer = require('multer');
const adminPanelController = require('../controllers/adminPanelController');
const authMiddleware = require('../middleware/authMiddleware');

const upload = multer();

const router = express.Router();

router.get('/apply', authController.login_get);

module.exports = router;