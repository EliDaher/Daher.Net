import { io } from "socket.io-client";

export const socket = io("https://daherserver-zgmy.onrender.com");

const registerReactUser = () => {
  socket.emit("register", "reactUser");
};

if (socket.connected) {
  registerReactUser();
}

socket.on("connect", registerReactUser);
