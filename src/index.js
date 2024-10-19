// process.env.DEBUG = '*';
process.env.DEBUG = 'engine, socket.io:socket, socket.io:client';

const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

io.of('custom-namespace').on('connection', (socket) => {
	socket.on('moveCircle', (position) => {
		socket.broadcast.emit('updateCircle', position);
	});
});

server.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
