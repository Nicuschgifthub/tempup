const path = require('path');

const web = (app) => {

    app.get('/', (req, res) => {
        try {
            res.sendFile(path.join(global.mainDir, 'src', 'web', 'index', 'index.html'));
        } catch (err) {
            console.log(err)
        }
    });

    app.get('/file-viewer/:type/:id', (req, res) => {
        try {
            if (!global.tempUp[req.params.id]) {
                res.redirect('/');
                return;
            }

            res.sendFile(path.join(global.mainDir, 'src', 'web', 'file-viewer', 'file-viewer.html'));
        } catch (err) {
            console.log(err)
        }
    });

    app.get('/web/:folder/:file', (req, res) => {
        try {
            res.sendFile(path.join(global.mainDir, 'src', 'web', req.params.folder, req.params.file));
        } catch (err) {
            console.log(err)
        }
    });
}

module.exports = { web };