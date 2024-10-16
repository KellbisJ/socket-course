const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'views')));

const socketsOnline = [];

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
	socketsOnline.push(socket.id);

	// Basic emition and listening
	socket.emit('connection', 'You are connected 😎');
	socket.on('message', (data) => {
		console.log(data);
	});

	// Emition to all servers
	io.emit('everyone', `${socket.id} has been connected`);

	// Emition to one
	socket.on('messageToLast', (message) => {
		const lastSokect = socketsOnline[socketsOnline.length - 1];
		io.to(lastSokect).emit('greeting', message);
	});

	// on, once, off

	// socket.emit('on', 'helllllo');
	// socket.emit('on', 'helllllo');

	// socket.emit('once', 'helllllo');
	// socket.emit('once', 'helllllo');
	// socket.emit('once', 'helllllo');

	socket.emit('off', 'helllllo');

	setTimeout(() => {
		socket.emit('off', 'helllllo');
	}, 3000);
});

server.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
