const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendfile('dist/index.html');
});

const database = {};

app.get('/new', (req, res) => {
    const user = req.query.user;
    const text = req.query.text;
})
