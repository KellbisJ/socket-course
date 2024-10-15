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
	console.log(socket.id);
});

server.listen(3000);
