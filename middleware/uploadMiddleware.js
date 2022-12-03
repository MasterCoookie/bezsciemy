const multer = require('multer');

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
})

module.exports = {
    upload
}