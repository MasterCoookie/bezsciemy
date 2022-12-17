const express = require('express');
const contentListController = require('../controllers/contentListController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', contentListController.main_get);
router.get('/:page_number', contentListController.main_get);

module.exports = router;
