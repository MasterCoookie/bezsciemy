const express = require('express');
const contentListController = require('../controllers/contentListController');
const profileSettingsController = require('../controllers/profileSettingsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/waiting_room', authMiddleware.require_login, contentListController.waiting_room_get);
router.get('/waiting_room/:page_number', authMiddleware.require_login, contentListController.waiting_room_get);

router.get('/hall_of_fame', contentListController.hall_of_fame_get);
router.get('/hall_of_fame/:page_number', contentListController.hall_of_fame_get);

router.get('/settings', authMiddleware.require_login, profileSettingsController.settings_get);
router.get('/profile', authMiddleware.require_login, profileSettingsController.profile_get);

router.get('/', contentListController.main_get);
router.get('/:page_number', contentListController.main_get);

module.exports = router;
