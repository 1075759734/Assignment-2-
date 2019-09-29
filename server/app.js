const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const { URL, DB_NAME } = require('./globals');

// add middleware into app
const app  = express();

const initSuperUser = {
  username: 'super',
  password: 'super',
  ofSuperAdminInRole: true,
  ofGroupAdminInRole: true,
  ofGroupAssistInRole: true,
  groupList: [],
  channelList: [],
  adminGroupList: [],
};

const cleanCol = false;

app.use(cors());
app.use(bodyParser.urlencoded({  extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// static path
app.use(express.static(path.join(__dirname, '../dist/my-app/')));
app.use(express.static(path.join(__dirname, './assets/')));
console.log(`server side dirname is: ${__dirname}`);

// create super user if it doesn't exist
createSuperUserIfNotExist();

app.get('', (req, res) => {
  const filePath = path.resolve('../dist/my-app/index.html');
  res.sendFile(filePath);
});

app.post('/login', require('./router/postLogin'));
app.post('/loginafter', require('./router/postLoginafter'));

require('./router/user')(app);
require('./router/channel')(app);
require('./router/group')(app);
require('./router/image')(app);

function createSuperUserIfNotExist() {
  MongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;

    const db = client.db(DB_NAME);
    const collection = db.collection('users');

    if (cleanCol) collection.deleteMany({});

    // callback
    collection
      .find({ username: 'super' })
      .count((err, count) => {
        if (err) throw err;

        if (count === 0) {
          collection.insertOne(initSuperUser, (err, dbres) => {
            if (err) {
              console.log('super has been initialized.')
              client.close();
              throw err;
            }
            client.close();
          });
        } else {
          client.close();
        }
      });
  });
}

module.exports = app;
