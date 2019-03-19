const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: true}));



app.get('/', (req, res) => {
  res.sendfile('dist/index.html');
});

const database = {messages: []};



app.get('/addNew', (req, res) => {
    const user = req.query.user;
    const text = req.query.message;

    database.messages.push({user, text, time: Date.now()});
    console.dir(JSON.stringify(database));
    res.send('ok');
});

app.get('/getNew', (req, res) => {
    const lastTime = req.query.lastTime;
    const result = database.messages.filter(item => item.time > lastTime);
    res.send(result);
});

app.get('/getAll', (req, res) => {
  res.send(database);
})




const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
