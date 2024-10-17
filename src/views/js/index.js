const socket = io();

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

	socket.emit('moveCircle', position);
};

document.addEventListener('mousedown', (e) => {
	document.addEventListener('mousemove', moveCircle);
});

document.addEventListener('mouseup', (e) => {
	document.removeEventListener('mousemove', moveCircle);
});

socket.on('updateCircle', (position) => {
	drawCircle(position);
});
