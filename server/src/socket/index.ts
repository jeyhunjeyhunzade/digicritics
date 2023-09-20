import { Socket } from "socket.io";

require("dotenv").config();
const { Server } = require("socket.io");

const isProduction = process.env.NODE_ENV === "production";
const origin = isProduction
  ? "https://digicritics-server-76f60f3f49d2.herokuapp.com"
  : "http://localhost:5173";

export const io = new Server(null, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cors: {
    origin,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
});

export const initSocketServer = (server: any) => {
  io.attach(server);

  io.on("connection", (socket: Socket) => {
    console.log("client connected: ", socket.id);
  });
};
