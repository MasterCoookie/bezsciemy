const express = require('express');
const postRoutes = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();
const upload_debunk_images = uploadMiddleware.upload.array("debunk_images", 8);

const upload_debunk_images_middleware = (req, res, next) => {
    upload_debunk_images(req, res, (err) => {
		if(err) {
            console.log("upload middleware err");
			return res.send(err);
		}
        next();
	});
}

router.get('/view', postRoutes.view_get);
//TODO - middleware
router.get('/create', authMiddleware.require_login, postRoutes.create_get);
//TODO - middleware, tmp
router.post("/create", [upload_debunk_images_middleware, authMiddleware.require_login], postRoutes.create_post);

module.exports = router;
