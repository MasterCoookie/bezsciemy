const express = require('express');
const multer = require('multer');
const postRoutes = require('../controllers/postController');

const upload = multer();

const router = express.Router();

router.get('/view', postRoutes.view_get);
//TODO - middleware
router.get('/create', postRoutes.create_get);
//TODO - middleware
router.post("/create", postRoutes.create_post);

module.exports = router;