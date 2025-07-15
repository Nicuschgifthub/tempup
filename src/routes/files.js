const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {

    let tempUpCopy = {};

    Object.keys(global.tempUp).forEach(key => {
        if (global.tempUp[key].path) {
            tempUpCopy[key] = { ...global.tempUp[key] };

            delete tempUpCopy[key].path;
        }
    });

    res.json(tempUpCopy);
});

router.get('/list/unfinished', (req, res) => {

    let tempUpCopy = {};

    Object.keys(global.tempUp).forEach(key => {
        if (!global.tempUp[key].path) {
            tempUpCopy[key] = { ...global.tempUp[key] };
        }
    });

    res.json(tempUpCopy);
});

router.get('/info/:id', (req, res) => {
    res.json(global.tempUp[req.params.id]);
});

module.exports = router;