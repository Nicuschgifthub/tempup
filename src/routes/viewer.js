const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {

    const id = req.params.id;

    if (!id || !global.tempUp[id].viewer) {
        res.redirect('/');
        return;
    }

    const fileViewerType = global.tempUp[id].viewer;

    res.redirect(`/file-viewer/${fileViewerType}/${id}`);
});

module.exports = router;