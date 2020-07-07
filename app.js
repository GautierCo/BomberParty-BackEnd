const express = require('express');
const path = require('path');
const router = require('./src/router');
const game = require('./src/chat');
const port = 3000;
const app = express();
const cors = require('cors');

app.use(cors());

// app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(port, () => {
    console.log("Server Started on port " + port);
});