const express = require('express');
const multer = require('multer');
const authController = require('../controllers/postController');

const upload = multer();

const router = express.Router();

router.get('/post', authController.post_get);
//TODO - middleware
router.get('/post_editor', authController.post_editor_get);
//TODO - middleware
router.post("post_editor", authController.post_editor_post);

module.exports = router;