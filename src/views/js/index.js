const socket = io();
const send = document.querySelector('#send');
const disconnect = document.querySelector('#disconnect');
const reconnect = document.querySelector('#connect');

send.addEventListener('click', () => {
	socket.connected ? socket.emit('is connected', '!Esta conectado!!') : null;
});

disconnect.addEventListener('click', () => {
	socket.disconnect();
});

reconnect.addEventListener('click', () => {
	socket.connect();
});
