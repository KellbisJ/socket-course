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
	// Basic emition and listening
	socket.emit('connection', 'You are connected 😎');
	socket.on('message', (data) => {
		console.log(data);
	});

	// Emition to all servers
	io.emit('everyone', `${socket.id} has been connected`);
});

server.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
