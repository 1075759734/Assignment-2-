const sockets = require('./socket.js');
const app = require('./app');

const PORT = '3000';

const http = require('http').Server(app);

const io = require('socket.io')(http);
sockets.connect(io, PORT);

http.listen(PORT, () => {
  console.log(`app is listening http://localhost:${PORT}`);
});

module.exports = http;
