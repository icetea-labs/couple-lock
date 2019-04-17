import socketClientIO from 'socket.io-client';

const socket = socketClientIO(process.env.develop_mode);

export function sendMessage(message, roomName, sender) {
    socket.emit('sendMessage', message, roomName, sender );
}
