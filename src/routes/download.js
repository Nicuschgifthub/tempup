const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/:id', (req, res) => {
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