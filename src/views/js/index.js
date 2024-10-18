const socket = io();
const send = document.querySelector('#send');
const disconnect = document.querySelector('#disconnect');
const reconnect = document.querySelector('#connect');

const circle = document.querySelector('#circle');

const drawCircle = (position) => {
	circle.style.top = position.top;
	circle.style.left = position.left;
};

const moveCircle = (e) => {
	const position = {
		top: e.clientY + 'px',
		left: e.clientX + 'px',
	};

	drawCircle(position);
	console.log('Event sended to server');

	socket.volatile.emit('moveCircle', position);
};

document.addEventListener('mousedown', (e) => {
	document.addEventListener('mousemove', moveCircle);
});

disconnect.addEventListener('click', () => {
	socket.disconnect();
});

reconnect.addEventListener('click', () => {
	socket.connect();
});
