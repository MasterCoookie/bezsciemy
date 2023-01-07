const express = require('express');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();
const upload_debunk_images = uploadMiddleware.upload.fields([{name: "debunk_images",maxCount: 8}, {name: "fake_images",maxCount:8}]);

const upload_debunk_images_middleware = (req, res, next) => {
    upload_debunk_images(req, res, (err) => {
		if(err) {
            console.log("upload middleware err");
			return res.send(err);
		}
        next();
	});
}

router.get('/view', postController.view_get);
router.get('/create', authMiddleware.require_login, postController.create_get);
router.post("/create", [upload_debunk_images_middleware, authMiddleware.require_login], postController.create_post);
router.post("/upvote", authMiddleware.require_login, postController.upvote_post);
router.post("/downvote", authMiddleware.require_login, postController.downvote_post);

router.put("/comment", commentController.comment_put);

module.exports = router;
