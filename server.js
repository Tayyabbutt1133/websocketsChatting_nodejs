const express = require('express')

const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;


const server = app.listen(PORT, () => {
    console.log("Express server is running !")
})

app.use(express.static(path.join(__dirname, 'public')))

const io = require('socket.io')(server);


// need to save unique ID's
let socketsConnectedCount = new Set();

io.on('connection', socketOnConnected);

function socketOnConnected(socket) {
    socketsConnectedCount.add(socket.id)


    io.emit('clients-total', socketsConnectedCount.size);


    socket.on('disconnect', () => {
        socketsConnectedCount.delete(socket.id);
        io.emit('clients-total', socketsConnectedCount.size);
    })


    socket.on('message', (data) => {
        socket.broadcast .emit('chat-message', data)
    })

    socket.on('feedback', (data) => {
        socket.broadcast .emit('feedback', data)
    })

}