const httpServer = require("http").createServer();
const ChatModel = require('./models/chatModel');
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});





io.on("connection", async(socket) => {
 
    console.log(`Socket conectado -  ${socket.id}`)

    let previousMessages = []
 
      let thisMessages = await ChatModel.find({})
    
      if (thisMessages.length > 0){
        for(let thisM of thisMessages){
          let returnMessages = {
            author: thisM.author,
            message: thisM.message
          }
    
        previousMessages.push(returnMessages)
        }
      }
        
    socket.emit('previousMessages', previousMessages);

    socket.on('sendMessage', async (data) =>{

        await ChatModel.create(data);
        socket.broadcast.emit('receivedMessage', data);
    })
});

httpServer.listen(3001);