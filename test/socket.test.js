const { createServer } = require('http');
const { Server } = require('socket.io');
const Client = require('socket.io-client');

describe('Testing Socket.IO', () => {
	// Before testing starts, we create the server and the client

	let io, serverSocket, clientSocket;

	beforeAll((done) => {
		const httpServer = createServer();
		io = new Server(httpServer);

		httpServer.listen(() => {
			const port = httpServer.address().port;
			clientSocket = new Client(`http://localhost:${port}`);

			io.on('connection', (socket) => {
				serverSocket = socket;
			});

			clientSocket.on('connect', done);
		});
	});
	// After testing is done, we close the connections
	afterAll(() => {
		io.close();
		clientSocket.close();
	});
	test('TEST EVENT', (done) => {
		// We send an event from the client socket
		clientSocket.on('greeting', (greet) => {
			try {
				expect(greet).toBe('Hello');
				done();
			} catch (error) {
				done(error);
			}
		});
		serverSocket.emit('greeting', 'Hello');
	});
	test('testing callbacks (acknowledgements)', (done) => {
		serverSocket.on('bark', (callback) => {
			callback('woof');
		});
		clientSocket.emit('bark', (arg) => {
			try {
				expect(arg).toBe('woof');
				done();
			} catch (error) {
				done(error);
			}
		});
	});
});
