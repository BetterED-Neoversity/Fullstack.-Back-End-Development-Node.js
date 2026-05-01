import express from "express";
import cookieParser from "cookie-parser";
import { createServer } from "node:http";
import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "./types/socket.ts";
import { registerChatHandlers } from "./sockets/chat.ts";
import authRouter from "./routes/auth.ts";
import { socketAuthMiddleware } from "./middlewares/socket-auth.ts";

const app = express();
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer);

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use("/auth", authRouter);

io.use(socketAuthMiddleware);

io.on("connection", (socket) => {
  registerChatHandlers(socket, io);
});

httpServer.listen(3000, () => {
  console.log("Сервер запущено на порті 3000");
});
