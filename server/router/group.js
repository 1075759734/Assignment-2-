const fs = require('fs');

module.exports = app => {
  // const jsonGroups = fs.readFileSync(path.resolve(__dirname, '../data/groups.json'));
  // const groups = JSON.parse(jsonGroups);

  app.get('/groups', (req, res) => {
    res.send('');
  });
};
