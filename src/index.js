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

io.on('connection', (socket) => {
	socket.connectedRoom = '';
	socket.on('joinRoom', (room) => {
		socket.leave(socket.connectedRoom);
		switch (room) {
			case 'room1':
				socket.join('room1');
				socket.connectedRoom = 'room1';
				break;
			case 'room2':
				socket.join('room2');
				socket.connectedRoom = 'room2';
				break;
			case 'room3':
				socket.join('room3');
				socket.connectedRoom = 'room3';
				break;

			default:
				break;
		}
	});
	socket.on('message', (message) => {
		const room = socket.connectedRoom;
		io.to(room).emit('send message', {
			message,
			room,
		});
	});
});

server.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
