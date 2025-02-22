const multer = require("multer") ;

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        
        
        if (file.fieldname === 'profileimage') {
            cb(null, './uploads/userprofile'); 
        } 
        else {
            cb(null, './uploads/files'); 
        }
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    }
});
 const upload = multer({ storage: storage });

module.exports = upload ;