const express = require('express');
const { createCanvas } = require('canvas');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const imageFolder = path.join(global.mainDir, 'src', 'web', 'images');

const findFileExtension = (fileName) => {
    const files = fs.readdirSync(imageFolder);

    for (const file of files) {
        const fileNameWithoutExtension = path.parse(file).name;
        if (fileNameWithoutExtension.toLowerCase().includes(fileName.toLowerCase())) {
            return path.extname(file);
        }
    }
    return null;
}

const sendDefaultImage = (req, res) => {
    const canvas = createCanvas(400, 400);
    const context = canvas.getContext('2d');

    context.fillStyle = 'lightblue';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'black';
    context.font = '30px Arial';
    context.fillText('Format: ' + req.params.type, 50, 100);

    const buffer = canvas.toBuffer('image/png');
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
}

router.get('/image/:type', (req, res) => {

    if (!req.params.type) {
        res.status(404).send();
        return;
    }
    const typePath = path.join(imageFolder, req.params.type + findFileExtension(req.params.type));

    if (fs.existsSync(typePath)) {
        res.sendFile(typePath);
    } else {
        sendDefaultImage(req, res)
    }
});

router.get('/thumbnail/:id', (req, res) => {
    res.sendFile(path.join(global.mainDir, 'data', 'files', req.params.id), (err) => {
        if (err) {
            console.log(err);
        } else {
            if (res.statusCode === 200) {
            } else { }
        }
    });
});

module.exports = router;