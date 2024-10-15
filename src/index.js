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
	// console.log('Client/s connected:', io.engine.clientsCount);
	// console.log('Socket ID:', socket.id);
	// socket.on('disconnect', () => {
	// 	console.log('Socket disconnected:', socket.id);
	// });
	socket.conn.once('upgrade', () => {
		console.log(`From HTTP Long-Pulling to ${socket.conn.transport.name}`);
	});
});

server.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
