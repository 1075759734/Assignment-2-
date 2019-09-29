const { URL, DB_NAME } = require('../globals');
const MongoClient = require('mongodb').MongoClient;
const colname = 'extendedUsers';

module.exports = async (req, res) => {
  const user = req.body;
  const userObj = { ...user };

  let client;

  try {

    client = await MongoClient.connect(URL, { useNewUrlParser: true });
    const db = client.db(DB_NAME);

    console.log({loginafter: userObj})

    await db.collection(colname).insertOne(userObj);

    await client.close();

    return res.send('added extended user');
  } catch (err) {
    throw err;
  }
};
