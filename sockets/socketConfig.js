import { io } from "socket.io-client";
export const socket = io('http://192.168.100.76:3001', {
  transports: ['websocket'], // you need to explicitly tell it to use websockets
  extraHeaders: {
    role: 'client',
  },
});

export const connectToSocket = () => {
  socket.connect();
  console.log('connected');
};

export const disconnectSocket = () => {
  socket.disconnect();
};
