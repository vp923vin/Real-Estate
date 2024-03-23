// utils/imageUpload.js
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            // Set the destination directory dynamically based on the file type
            if (file.fieldname === 'mainImage') {
                cb(null, 'public/assets/uploads/blogs/tImages');
            } else if (file.fieldname === 'multiImages') {
                cb(null, 'public/assets/uploads/blogs/dImages');
            } else {
                cb(new Error('Invalid file field'), null);
            }
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, `${Date.now()}${ext}`);
        }
    }),
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },
});

module.exports = upload;
