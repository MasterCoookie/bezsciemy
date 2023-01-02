const express = require('express');
const contentListController = require('../controllers/contentListController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/waiting_room', contentListController.waiting_room_get);
router.get('/waiting_room:page_number', contentListController.waiting_room_get);

router.get('/', contentListController.main_get);
router.get('/:page_number', contentListController.main_get);

module.exports = router;
