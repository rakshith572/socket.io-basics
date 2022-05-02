
const io=require('socket.io')(5000,{
    cors:{
        origin:['http://localhost:8080'],
    },
})
io.on('connection',(socket)=>{
    // console.log(socket.id);
    socket.on('message-send',(message,room,cb)=>{
        // io.emit('message-recieve',message);// send the message to all the client that is connected
        console.log(message);

        // io.emit('message-recieve',message);//send the message to all client expect to the one who is sending
        if(room===""){
            socket.broadcast.emit('message-recieve',message);
            cb(`message SENT to all friend`);
        }else{
            socket.to(room).emit('message-recieve',message);
            cb(`message SENT to friend with room ${room}`);
        }
    });

    socket.on('join-room',(room,callBackFromClient)=>{
        socket.join(room);
        callBackFromClient(`joined the room ${room}`);
    });
});