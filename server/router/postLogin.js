const { URL, DB_NAME } = require('../globals');
const MongoClient = require('mongodb').MongoClient;
const colname = 'users';

module.exports = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(`Receive login request: username: ${username}; password: ${password}`);

  let client;

  try {
    client = await MongoClient.connect(URL, { useNewUrlParser: true });
    const db = client.db(DB_NAME);

    console.log(`login query: {username: ${username}, password: ${password} }`)
    const data = await db.collection(colname).findOne({ username, password });

    if (!data) {
      await client.close();
      return res.status(404).send('User not found');
    }

    await client.close();

    return res.send(data);

  } catch (err) {
    return await handleError(err, client);
  }
};
