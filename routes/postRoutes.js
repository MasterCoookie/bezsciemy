const express = require('express');
const multer = require('multer');
const fs = require('fs');
const postRoutes = require('../controllers/postController');

const router = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        //TODO - not random, make reasonable way to name file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

let upload = multer({
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

router.get('/view', postRoutes.view_get);
//TODO - middleware
router.get('/create', postRoutes.create_get);
//TODO - middleware, tmp
router.post("/create", (req, res, next) => {
    console.log(req.file);
    upload(req, res, (err) => {
		if(err) {
            console.log("dupa err");
			return res.send(err);
		}
        console.log("dupa");
        res.send("all done");
	});
});

module.exports = router;