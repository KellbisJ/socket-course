const socket = io();

function checkSocketStatus() {
	console.log(`Socket status: ${socket.connected}`);
}

socket.on('connect', () => {
	checkSocketStatus();
	console.log(`Connected to server, socketID: ${socket.id}`);
});

socket.on('connect_error', () => {
	console.log('Connection failure ❌');
});

socket.on('disconnect', () => {
	checkSocketStatus();
	console.log(`Disconnected from server socketID: ${socket.id}`);
});

socket.io.on('reconnect_attempt', () => {
	console.log('Attempting to reconnect... 🔁');
});

socket.io.on('reconnect', () => {
	console.log('Reconnected succesfully ✅');
});
