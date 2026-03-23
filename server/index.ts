import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { addUser, removeUser } from "./users";

const app = express();
app.use(cors());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("join", ({ name, room }, callback) => {
    console.log("user join data ", name);
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      callback(error);
    }
    callback();
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
    removeUser(socket.id);
  });
});

const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "app is running" });
});

httpServer.listen(port, () => {
  console.log(`Express server is running with typescript on port ${port}`);
});
