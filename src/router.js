const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    res.sendFile('index.html');
});

module.exports = router;