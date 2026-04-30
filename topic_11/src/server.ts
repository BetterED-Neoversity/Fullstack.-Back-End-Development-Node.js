import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Користувач підключився:", socket.id);

  socket.on("disconnect", () => {
    console.log("Користувач відключився:", socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log("Сервер запущено на порті 3000");
});
