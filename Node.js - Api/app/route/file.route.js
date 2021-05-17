module.exports = function(app, path, multer) {
    const file = require('../controller/file.controller.js');

    // File upload settings  
    const PATH = './uploads';

    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, PATH);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    });

    let upload = multer({
        storage: storage
    });

    // Upload Files
    app.post("/api/upload/:id", upload.array("uploads[]", 3), file.create);

    app.get("/api/upload/:id", file.getFiles);

    // Update Files
    app.post("/api/upload/photo/:id",upload.array("uploads[]",1),file.updatePhoto);
    
    app.post("/api/upload/certificate/:id",upload.array("uploads[]", 1),file.updateCertificate);
    
    app.post("/api/upload/form/:id",upload.array("uploads[]", 1),file.updateForm);

}