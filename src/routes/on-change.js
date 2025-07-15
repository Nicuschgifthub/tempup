const express = require('express');
const router = express.Router();

router.get('/basic-update', (req, res) => {

    setTimeout(() => {
        res.status(200).send({});
    }, 2000);

});

module.exports = router;