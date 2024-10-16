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

const emitToLast = document.querySelector('#emitToLastButton');
emitToLast.addEventListener('click', () => {
	socket.emit('messageToLast', 'Hello to the last user!');
});

socket.on('greeting', (message) => {
	console.log(message);
});

// on, once, off

socket.on('on', () => {
	console.log('Emits many times');
});

socket.once('once', () => {
	console.log('One time');
});

const listener = () => {
	console.log('Event off');
};

socket.on('off', listener);
setTimeout(() => {
	socket.off('off', listener);
}, 2000);
