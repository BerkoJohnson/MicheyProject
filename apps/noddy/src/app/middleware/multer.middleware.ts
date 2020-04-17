import * as multer from 'multer';
import * as express from 'express';

const upload = multer({
    limits: {
        fileSize: 2000000,
        files: 1
    },
    fileFilter(req: express.Request, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Upload image file only"));
        }
        cb(undefined, true);
    }
})


export default upload;