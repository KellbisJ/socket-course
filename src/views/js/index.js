const socket = io();

// Room connection buttons
const connectRoom1 = document.querySelector('#connectRoom1');
const connectRoom2 = document.querySelector('#connectRoom2');
const connectRoom3 = document.querySelector('#connectRoom3');

// Events for room connection buttons
connectRoom1.addEventListener('click', () => {
	socket.emit('joinRoom', 'room1');
});

connectRoom2.addEventListener('click', () => {
	socket.emit('joinRoom', 'room2');
});

connectRoom3.addEventListener('click', () => {
	socket.emit('joinRoom', 'room3');
});

// Event for send messages
const sendMessage = document.querySelector('#sendMessage');

sendMessage.addEventListener('click', () => {
	const messageInput = prompt('Type your message:');
	socket.emit('message', messageInput);
});

// Event for receiving messages
socket.on('send message', (data) => {
	const { room } = data;
	const { message } = data;
	const li = document.createElement('li');
	li.textContent = message;

	document.querySelector(`#${room}`).append(li);
});
