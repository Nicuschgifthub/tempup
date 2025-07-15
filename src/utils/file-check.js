const config = require('./../../config.json');
const path = require('path');
const fs = require('fs');

const checkFilesDateAndUploadingFiles = () => {
    Object.keys(global.tempUp).forEach(id => {
        const item = global.tempUp[id];
        if (item.onlineuntil + config.files.removethreshold < Date.now()) {
            fs.unlinkSync(path.join(global.mainDir, 'data', 'files', id));
            delete global.tempUp[id];
            return;
        }

        if (item.lastchunk && item.lastchunk + config.files.uploadtimeout < Date.now()) {
            delete global.tempUp[id];
            return;
        }
    });
}

setInterval(() => {
    checkFilesDateAndUploadingFiles();
}, 5000);