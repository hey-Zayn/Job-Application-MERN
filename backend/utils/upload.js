const cloudinary = require('./cloudinaryConfig');
const streamifier = require('streamifier');

const upload = (file) => {
    return new Promise((resolve, reject) => {
        if (!file || !file.buffer) {
            return reject(new Error("Invalid file or missing buffer property"));
        }

        // FIX: Change 'steam' to 'stream'
        let stream = cloudinary.uploader.upload_stream({
            folder: 'test',
            transformation: [{ width: 800, height: 800, crop: 'limit' }]
        }, (error, result) => {
            if (error) { return reject(error); }
            resolve(result);
        });

        streamifier.createReadStream(file.buffer).pipe(stream);
    });
}

module.exports = upload;