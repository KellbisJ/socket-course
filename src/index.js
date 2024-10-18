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

// Middleware to check if the user is authorized
io.use((socket, next) => {
	const token = socket.handshake.auth.token;
	const error = new Error('Not authorized');

	token === 'your-secret-token'
		? next()
		: ((error.data = {
				details: 'unauthorized',
		  }),
		  next(error));
});

io.on('connection', (socket) => {
	console.log(socket.id);
});

server.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
