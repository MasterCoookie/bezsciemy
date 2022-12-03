const express = require('express');
const multer = require('multer');
const fs = require('fs');
const postRoutes = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        //TODO - not random, make reasonable way to name file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter:(req, file, cb) => {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            console.log("dupa error file to large");
            return cb(new Error('File size too large'));
        }
        cb(undefined, true);
    }
}).array("debunk_images", 8);

const debunk_images_upload = (req, res, next) => {
    upload(req, res, (err) => {
		if(err) {
            console.log("dupa err");
			return res.send(err);
		}
        next();
	});
}

router.get('/view', postRoutes.view_get);
//TODO - middleware
router.get('/create', authMiddleware.require_login, postRoutes.create_get);
//TODO - middleware, tmp
router.post("/create", [debunk_images_upload, authMiddleware.require_login], postRoutes.create_post);

module.exports = router;