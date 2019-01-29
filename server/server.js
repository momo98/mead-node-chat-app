const path = require('path');
const http = require('http');
var express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket) => { //event handlers
  console.log('New User connected')

  socket.on('disconnect', () => {
    console.log('Disconnected from user')
  })

  socket.on('createMessage', (message) => {
    console.log('newMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });
});



server.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
