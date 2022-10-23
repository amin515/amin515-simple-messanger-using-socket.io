const express = require('express');
const colors = require('colors');
const { createServer} = require('http');
const {Server} = require('socket.io');
const path = require('path');
const { readFileSync, writeFileSync } = require('fs');


// express initialise
const app = express();



// create express server to raw server for socket.io
const httpServer = createServer(app);




// to convert io
const io = new Server(httpServer);



// static folder
app.use(express.static(path.join(__dirname, '')))





// create a connection
io.on('connection', (socket) => {



  socket.on('chat', ({name, photo, message}) => {
   
    let oldChat = JSON.parse(readFileSync(path.join(__dirname, 'db/chat.json')).toString())
    oldChat.push({name, photo, message});
    writeFileSync(path.join(__dirname, 'db/chat.json'),JSON.stringify(oldChat))
    
    let latestChat = JSON.parse(readFileSync(path.join(__dirname, 'db/chat.json')).toString());
    io.sockets.emit('latestChat', latestChat)

  })
   



})







// make rout for get 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client.html'))
})

// listen port
httpServer.listen(5050, () => {
    console.log('server run port 5050'.bgMagenta.black);
});