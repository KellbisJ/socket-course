const user = prompt('Type your user');
const teachers = ['RetaxMaster', 'JuanDC', 'GNDX'];

let socketNamespace, group;

const chat = document.querySelector('#chat');
const namespace = document.querySelector('#namespace');

if (teachers.includes(user)) {
	socketNamespace = io('/teachers');
	group = 'teachers';
} else {
	socketNamespace = io('/students');
	group = 'students';
}

socketNamespace.on('connect', () => {
	namespace.textContent = group;
});

// Send messages logic
const sendMessage = document.querySelector('#sendMessage');
sendMessage.addEventListener('click', () => {
	const message = prompt('Type your message:');
	socketNamespace.emit('sendMessage', {
		message,
		user,
	});
});

socketNamespace.on('message', (messageData) => {
	const { user, message } = messageData;
	const li = document.createElement('li');
	li.textContent = `${user}: ${message}`;
	chat.append(li);
});
