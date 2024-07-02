const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');

const append = (msg, pos) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = msg;
    messageElement.classList.add('msg');
    messageElement.classList.add(pos);
    messageContainer.append(messageElement);
    if(pos == 'left'){audio.play();}
    
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right')
    socket.emit('send',message)
    messageInput.value=''
})


const name = prompt("Enter your name to Join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});
socket.on('left', name => {
    append(`${name} left the chat `, 'right');
});