// socket.js
import { io } from "socket.io-client";

export const socket = io("https://daherserver-zgmy.onrender.com");
socket.emit("register", "reactUser");
