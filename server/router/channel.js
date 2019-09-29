const { URL, DB_NAME } = require('../globals');
const MongoClient = require('mongodb').MongoClient;
const colname = 'channels';

module.exports = app => {
  // const jsonChannels = fs.readFileSync(path.resolve(__dirname, '../data/channels.json'));
  // const channels = JSON.parse(jsonChannels);

  app.get('/channels', findAllChannels);
  app.get('/channel/:channelname', findChannel);
  app.post('/channel', insertChannel);
  app.put('/channel/:channelname', updateChannel);
  app.delete('/channel/:channelname', deleteChannel);

  async function findAllChannels(req, res) {
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

  async function insertChannel(req, res) {
    if (!req.body) {
      return res.status(400).send('Bad request.');
    }

    console.log({ insertBody: req.body});

    let client;

    try {
      const channelname = req.body.channelname;

      client = await MongoClient.connect(URL, { useNewUrlParser: true });
      const db = client.db(DB_NAME);

      const count = await db.collection(colname).find({ channelname }).count();

      if (count > 1) {
        return res.status(400).send({
          success: 'false',
          message: 'channel is missing or duplicated'
        });
      }

      await db.collection(colname).insertOne(req.body);
      console.log(`successfully insert channel: ${req.body}`);

      await client.close();
      return res.send('');
    } catch (err) {
      return await handleError(err, client);
    }
  }

  async function findChannel(req, res) {
    let client;

    try {
      const channelname = req.params.channelname;

      client = await MongoClient.connect(URL, { useNewUrlParser: true });
      const db = client.db(DB_NAME);
      const data = await db.collection(colname).findOne({ channelname });

      await client.close();

      return res.send(data);

    } catch (err) {
      return await handleError(err, client);
    }
  }

  async function updateChannel(req, res) {
    if (!req.body) {
      return res.status(400).send('Bad request.');
    }

    let client;

    try {
      const channelname = req.params.channelname;

      client = await MongoClient.connect(URL, { useNewUrlParser: true });
      const db = client.db(DB_NAME);

      console.log({updateChannelBody: req.body});

      const result = await db.collection(colname).findOneAndUpdate({ channelname }, {$set: req.body});

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

  async function deleteChannel(req, res) {
    let client;

    try {
      const channelname = req.params.channelname;

      client = await MongoClient.connect(URL, { useNewUrlParser: true });
      const db = client.db(DB_NAME);

      const result = await db.collection(colname).findOneAndDelete({ channelname });

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
};
