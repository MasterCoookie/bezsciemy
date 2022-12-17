const express = require('express');
const contentListController = require('../controllers/contentListController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', contentListController.main_get);

module.exports = router;
