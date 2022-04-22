const httpServer = require("http").createServer();
const ChatModel = require('./models/chatModel')
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


io.on("connection", (socket) => {
    console.log(`Socket conectado -  ${socket.id}`)

    socket.emit('previousMessages', messages)

    socket.on('sendMessage', (data) =>{

        ChatModel.create(data);
        socket.broadcast.emit('receivedMessage', data)
    })
});

httpServer.listen(3001);