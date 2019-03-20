const express = require('express');
const cors = require('cors');
const app = express();
const Datastore = require('nedb');


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: true}));


const db = new Datastore({filename : 'messages'});
db.loadDatabase();

app.get('/', (req, res) => {
  res.sendfile('dist/index.html');
});


app.post('/addNew', (req, res) => {
    const user = req.body.user;
    const text = req.body.message;
    const time = Date.now();
    db.insert({user, text, time});
    res.send('ok');
});

app.get('/getNew', (req, res) => {
    const lastTime = parseInt(req.query.lastTime);
    db.find({ time: { $gt: lastTime } }, function (err, docs) {
      const result = docs.sort((a, b) => {
        a.time - b.time;
      });
      res.send(result);
    });
});

const port = 4000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
