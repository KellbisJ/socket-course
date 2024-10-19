const socket = io('/custom-namespace');

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

// If error
socket.on('connect_error', (error) => {
	console.error('Connection error:', error.message);
	console.log(error.data.details);
});
