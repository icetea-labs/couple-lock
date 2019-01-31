const multer = require('multer');
/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
*/

//module.exports = multer({ storage: storage })

module.exports = multer({ dest: 'public/uploads/' })

