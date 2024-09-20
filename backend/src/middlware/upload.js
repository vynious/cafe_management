import multer from 'multer';


// configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/cafe_logos');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

export const uploadLogo = upload.single('logo');

// currently this stores the file in the uploads/cafe_logos folder
// Note: This approach is not scalable for large applications or distributed systems
// as it relies on local file storage. 
// Consider using cloud storage solutions like AWS S3, Google Cloud Storage, etc.
// For the scope of this project, this is a good solution
export const handleLogoUpload = (req, res, next) => {
    uploadLogo(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        next();
    });
};