const express = require('express');
const multer = require('multer');
const adminPanelController = require('../controllers/adminPanelController');
const authMiddleware = require('../middleware/authMiddleware');

const upload = multer();

const router = express.Router();

router.get('/apply', authMiddleware.require_login, adminPanelController.apply_get);
router.post('/apply', [upload.none(), authMiddleware.require_login], adminPanelController.apply_post);
router.get('/review', authMiddleware.require_admin, adminPanelController.review_get);
router.post('/review', authMiddleware.require_admin, adminPanelController.review_post);
router.get('/', authMiddleware.require_admin, adminPanelController.list_get);


module.exports = router;