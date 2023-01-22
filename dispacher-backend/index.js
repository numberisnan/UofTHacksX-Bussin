import { Server } from "socket.io";

const sessionsMap = {};

const io = new Server(8000, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.emit("server_chat", "apples");

    socket.on("client_chat", chat => {
        console.log(chat)
    });
});