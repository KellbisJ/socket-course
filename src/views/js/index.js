const socket = io();

socket.on('connection', (data) => {
	text.textContent = data;
});

const emitButton = document.querySelector('#emitButton');
emitButton.addEventListener('click', () => {
	socket.emit('message', 'Hello from the client!');
});

socket.on('everyone', (data) => {
	console.log(data);
});
