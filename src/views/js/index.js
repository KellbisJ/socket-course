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
