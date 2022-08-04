import multer, { Options as MulterOptions } from "multer"

import { CONFIG } from "@config"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, CONFIG.storageDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        // const fileName = `${uniqueSuffix}--${file.filename}`
        const fileName = `${uniqueSuffix}--${req.body.fileName}`
        cb(null, fileName)
    },
})

export const multerOptions: MulterOptions = {
    // dest: CONFIG.storageDir,
    // preservePath: true,
    storage: storage,
}
