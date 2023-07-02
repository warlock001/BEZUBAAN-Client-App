import {io} from 'socket.io-client';
import {Config} from '../config';
const REACT_APP_BASE_URL = Config.ip;
export const socket = io(REACT_APP_BASE_URL, {
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
