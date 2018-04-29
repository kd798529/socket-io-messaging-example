const express = require('express');
const socket = require('socket.io');
const http = require('http');

const app =express();

const server = http.Server(app);
const io = socket(server);


io.on('connection', skt => {
	console.log('user is connected');
	skt.on('disconnect', () => {
		console.log('user is disconnected')
	})
})

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});



app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

server.listen(8000);