import http from "http";
import { Server } from "socket.io";
const httpServer = http.createServer();

const server = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});

server.listen(3002);
