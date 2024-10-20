const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { instrument } = require('@socket.io/admin-ui');

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: ['https://admin.socket.io'],
		credentials: true,
	},
});

instrument(io, {
	auth: {
		type: 'basic',
		username: 'admin',
		password: '',
	},
});

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
	socket.on('moveCircle', (position) => {
		socket.broadcast.emit('updateCircle', position);
	});
});

server.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
