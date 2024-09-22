import multer from 'multer';
import path from 'path';
import fs from 'fs'

// configure multer for file public
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/cafe_logos');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

export const getLogoFileName = (cafeName, fileExtension) => {
    const sanitizedName = cafeName.replace(/\s+/g, '_').toLowerCase();
    return `${sanitizedName}${fileExtension}`;
}

export const uploadLogo = upload.single('logo');

// currently this stores the file in the public/cafe_logos folder
// Note: This approach is not scalable for large applications or distributed systems
// as it relies on local file storage. 
// we can consider using cloud storage solutions like AWS S3, Google Cloud Storage, etc.
export const handleLogoUpload = (req, res, next) => {
    uploadLogo(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (req.file && req.body.name) {
            const fileExtension = path.extname(req.file.originalname).toLowerCase();
            const newFileName = getLogoFileName(req.body.name, fileExtension);
            const oldPath = req.file.path;
            const newPath = `public/cafe_logos/${newFileName}`;

            try {
                // Remove existing logo files with the same name but different extensions
                const baseFileName = path.parse(newFileName).name;
                const existingFiles = await fs.promises.readdir('public/cafe_logos');
                for (const file of existingFiles) {
                    if (file.startsWith(baseFileName) && file !== newFileName) {
                        await fs.promises.unlink(`public/cafe_logos/${file}`);
                    }
                }

                // Rename and move the new file
                await fs.promises.rename(oldPath, newPath);
                req.file.filename = newFileName;
                req.file.path = newPath;
            } catch (error) {
                console.error('Error processing file:', error);
                return res.status(500).json({ error: 'Error processing file' });
            }
        }
        next();
    });
};