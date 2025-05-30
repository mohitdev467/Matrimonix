import { io } from "socket.io-client";

// Replace with your backend URL
const SOCKET_URL = "http://143.110.243.199:5001";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  forceNew: true,
});

export default socket;
