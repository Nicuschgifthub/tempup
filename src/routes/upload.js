const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { registerUpload, registerWhileUpload } = require('./../utils/register-file');

router.post('/chunk', (req, res) => {
    const chunk = req.files.chunk;
    const totalChunks = Number(req.body.totalChunks);
    const currentChunk = Number(req.body.currentChunk);
    const id = req.body.id;
    const type = req.body.type;
    const name = req.body.name;
    const fileExtension = path.extname(name);

    const uploadDir = path.join(global.mainDir, 'data', 'chunks', id.toString());

    fs.mkdir(uploadDir, { recursive: true }, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error creating upload directory' });
        }

        const filename = path.join(uploadDir, `chunk_${currentChunk}.part`);
        let format = type.split("/")[1];

        if (format == undefined && name.split(".")[1]) {
            format = name.split(".")[name.split(".").length - 1];
        }

        chunk.mv(filename, (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error saving chunk' });
            }

            if (currentChunk === totalChunks - 1) {
                // const finalFilename = path.join(global.mainDir, 'data', 'files', `${id}${fileExtension}`);
                const finalFilename = path.join(global.mainDir, 'data', 'files', `${id}`);

                const writeStream = fs.createWriteStream(finalFilename);

                for (let i = 0; i < totalChunks; i++) {
                    const chunkPath = path.join(uploadDir, `chunk_${i}.part`);
                    const chunkData = fs.readFileSync(chunkPath);
                    fs.unlinkSync(chunkPath);
                    writeStream.write(chunkData);
                }

                writeStream.end(() => {
                    registerUpload(finalFilename, name, name.split(".")[name.split(".").length - 1], format, id, totalChunks);

                    return res.status(200).json({ success: true, message: 'File uploaded and assembled' });
                });
            } else {
                registerWhileUpload(name, name.split(".")[name.split(".").length - 1], format, id, totalChunks, currentChunk);

                return res.status(200).json({ success: true, message: 'Chunk uploaded' });
            }
        });
    });
});

module.exports = router;