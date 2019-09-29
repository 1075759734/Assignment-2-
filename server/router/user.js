// const fs = require('fs');
const { URL, DB_NAME } = require('../globals');
const MongoClient = require('mongodb').MongoClient;
const colname = 'users';
// const client = new MongoClient(url);

module.exports = app => {
  // const jsonUsers = fs.readFileSync(path.resolve(__dirname, '../data/users.json'));
  // const users = JSON.parse(jsonUsers);

  // client.connect((err) => {
  //   console.log('Connect successfully to server');
  //   const db = client.db(dbName);
  //   client.close();
  // });

  // app.get('/users', (req, res) => {
  //   res.send(users);
  // });
  app.get('/users',             findAllUsers);
  app.get('/user/:username',    findUser);
  app.post('/user',             insertUser);
  app.put('/user/:username',    updateUser);
  app.delete('/user/:username', deleteUser);
};

async function findAllUsers(req, res) {
  let client;

  try {
    client = await MongoClient.connect(URL, { useNewUrlParser: true });

    const db = client.db(DB_NAME);
    const data = await db.collection(colname).find({}).toArray();
    await client.close();
    return res.send(data);
  } catch (err) {
    return await handleError(err, client);
  }
}

async function insertUser(req, res) {
  if (!req.body) {
    return res.status(400).send('Bad request.');
  }

  console.log({ insertBody: req.body});

  let client;

  try {
    const username = req.body.username;

    client = await MongoClient.connect(URL, { useNewUrlParser: true });
    const db = client.db(DB_NAME);

    const count = await db.collection(colname).find({ username }).count();

    if (count > 1) {
      return res.status(400).send({
        success: 'false',
        message: 'username is missing or duplicated'
      });
    }

    await db.collection(colname).insertOne(req.body);
    console.log(`successfully insert user: ${req.body}`);

    await client.close();
    return res.send('');
  } catch (err) {
    return await handleError(err, client);
  }
}

async function findUser(req, res) {
  let client;

  try {
    const username = req.params.username;

    client = await MongoClient.connect(URL, { useNewUrlParser: true });
    const db = client.db(DB_NAME);
    const data = await db.collection(colname).findOne({ username });

    await client.close();

    return res.send(data);

  } catch (err) {
    return await handleError(err, client);
  }
}

async function updateUser(req, res) {
  if (!req.body) {
    return res.status(400).send('Bad request.');
  }

  let client;

  try {
    const username = req.params.username;

    client = await MongoClient.connect(URL, { useNewUrlParser: true });
    const db = client.db(DB_NAME);

    console.log({updateUserBody: req.body});

    const result = await db.collection(colname).findOneAndUpdate({ username }, {$set: req.body});

    if (!result.value) {
      return res.status(404).send('Not found.')
    };

    console.log({ updateResult: result });

    await client.close();
    return res.send({ user: result.value});
  } catch (err) {
    return await handleError(err, client);
  }
}

async function deleteUser(req, res) {
  let client;

  try {
    const username = req.params.username;

    client = await MongoClient.connect(URL, { useNewUrlParser: true });
    const db = client.db(DB_NAME);

    const result = await db.collection(colname).findOneAndDelete({ username });

    if (!result.value) {
      return res.status(404).send('Not found.')
    };

    console.log({ updateResult: result });

    await client.close();
    return res.send({ user: result.value});
  } catch (err) {
    return await handleError(err, client);
  }
}

async function handleError(err, client) {
  console.error(err);
  if (client) await client.close();
  throw err;
}
