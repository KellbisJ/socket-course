const socket = io({
	auth: {
		token: 'your-secret-token',
	},
});

// If error
socket.on('connect_error', (error) => {
	console.error('Connection error:', error.message);
	console.log(error.data.details);
});
