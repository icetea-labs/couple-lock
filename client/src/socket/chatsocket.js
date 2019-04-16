import socketClientIO from 'socket.io-client';

const socket = socketClientIO('localhost:5000');

export function sendMessage(message, roomName, sender) {
    socket.emit('sendMessage', message, roomName, sender );
}
