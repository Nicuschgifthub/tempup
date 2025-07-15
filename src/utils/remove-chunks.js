const fs = require('fs');
const path = require('path');

const removeFoldersRecursively = (directoryPath) => {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file, index) => {
            const curPath = path.join(directoryPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                removeFoldersRecursively(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        if (directoryPath.endsWith('chunks')) return;
        if (directoryPath.endsWith('files')) return;
        fs.rmdirSync(directoryPath);
    }
}

removeFoldersRecursively(path.join(global.mainDir, 'data', 'chunks'));
removeFoldersRecursively(path.join(global.mainDir, 'data', 'files'));