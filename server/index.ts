import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { addUser, getUserById, removeUser, USER } from "./users";

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
      return callback(error);
    }

    socket.join(room);
    socket.emit("message", {
      user: "System",
      text: `welcome ${name} to ${room}.`,
    });

    socket.broadcast.to(room).emit("message", {
      user: "System",
      text: `${name} just joined inside ${room}.`,
    });

    callback();
  });

  socket.on("message", (message) => {
    const user = getUserById(socket.id);
    console.log('user message', user)

    if (user) {
      io.to(user.room).emit("message", {
        user: user.name,
        text: message,
      });
    }
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "System",
        text: `${user.name} just left ${user.room}.`,
      });
    }
  });
});

const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "app is running" });
});

httpServer.listen(port, () => {
  console.log(`Express server is running with typescript on port ${port}`);
});
