const config = require('./../../config.json');

const registerUpload = (path, name, normalformat, format, id, totalChunks) => {

    const imageUrl = config.files.imageurl.showfile.indexOf(normalformat) == -1 ? ('/type/image/' + normalformat) : ('/type/thumbnail/' + id);
    const fileViewer = config.files.viewer[normalformat] ? config.files.viewer[normalformat] : undefined;

    const filePacket = {
        path: path,
        name: name,
        viewer: fileViewer,
        format: normalformat,
        formattext: format,
        imageurl: imageUrl,
        maxsize: (totalChunks * 2) + "Mb",
        uploadtime: Date.now(),
        onlineuntil: Date.now() + config.files.expire,
        expire: config.files.expire
    }

    global.tempUp[id] = filePacket;
}


const registerWhileUpload = (name, normalformat, format, id, totalChunks, currentChunk) => {
    const filePacket = {
        name: name,
        format: normalformat,
        formattext: format,
        maxsize: (totalChunks * 2) + "Mb",
        uploadtime: "Uploading...",
        lastchunk: Date.now(),
        uploaded: ((currentChunk / totalChunks) * 100)
    }

    global.tempUp[id] = filePacket;
}

module.exports = { registerUpload, registerWhileUpload };