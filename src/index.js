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

const teachers = io.of('teachers');
const students = io.of('students');

teachers.on('connection', (socket) => {
	console.log(`${socket.id} se ha conectado a la sala de teachers`);
});
students.on('connection', (socket) => {
	console.log(`${socket.id} se ha conectado a la sala de students`);
});

server.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
