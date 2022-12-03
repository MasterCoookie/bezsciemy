const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        //naming convention: debunk_images/fake_images + '-' + userID + '-' + postTitle + '-' + originalFileName
        cb(null, file.fieldname + '-' + req.session.user.id + '-' + req.body.title + '-' + file.originalname)
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
})

module.exports = {
    upload
}