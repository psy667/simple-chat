const express = require('express');
const cors = require('cors');
const app = express();
const Datastore = require('nedb');


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: true}));

app.use(express.static('dist'));

const mess = new Datastore({filename : 'messages'});
mess.loadDatabase();


const getColor = (name) => {
  const colors = ['#ff5e5e', '#ffab5e', '#fff65e', '#b0f957', '#3affdb', '#7970ff'];
  const index = name.split('').reduce((acc, cur) => acc+cur.charCodeAt(0), 0) % colors.length;
  return colors[index];
}


app.get('/', (req, res) => {
  res.sendfile('dist/index.html');
});



app.post('/addNew', (req, res) => {
    const user = req.body.user;
    const text = req.body.message;
    const time = Date.now();
    const color = getColor(user);
    mess.insert({user, text, time, color});
    res.send('ok');
});

app.get('/getNew', (req, res) => {
    const lastTime = parseInt(req.query.lastTime);
    mess.find({ time: { $gt: lastTime } }, function (err, docs) {
      docs.sort((a, b) => {
        return a.time - b.time;
      });
      res.send(docs);
    });
});




const port = 80;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
