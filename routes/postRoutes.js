const express = require('express');
const multer = require('multer');
const fs = require('fs');
const postRoutes = require('../controllers/postController');

const router = express.Router();

let storage = multer.diskStorage({
    destenation: (req, res, callback) => {
        const dir = "../uploads"

        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: (req, file, callback) => {
        console.log(file.originalname);
        callback(null, file.originalname)
    }
})

let upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1000000
    // },
    // fileFilter:(req, file, cb) => {
    //     console.log("matching dupa");
    //     if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    //         console.log("dupa error file to large");
    //         return cb(new Error('File size too large'));
    //     }
    //     cb(undefined, true);
    //     console.log("ended matching dupa");
    // }
}).single("debunk_images");

router.get('/view', postRoutes.view_get);
//TODO - middleware
router.get('/create', postRoutes.create_get);
//TODO - middleware, tmp
router.post("/create", (req, res, next) => {
    console.log(req);
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