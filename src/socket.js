// socket.js
import { io } from "socket.io-client";

let socket = null;

export const getSocket = () => {
  if (!socket) {   //Checks if the socket connection is already made.

    socket = io(`${import.meta.env.VITE_API_URL}`, {
      withCredentials: true,
    });
  }
  return socket;
};
