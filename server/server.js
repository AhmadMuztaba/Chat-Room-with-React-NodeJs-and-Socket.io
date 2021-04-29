const express=require('express');
const app=express();
const server=require('http').createServer(app);
const io=require('socket.io')(server);
const {addUser,removeUser,getUser,getUserInRoom} =require('./User')
io.on('connection',(socket)=>{
      socket.on('join',({name,room},callback)=>{
       const {user,error}=addUser({id:socket.id,name:name,room:room});
       
       if(error){
           return callback(error)
       }
       socket.join(user.room);
       socket.emit('Message',{user:'Admin',text:`Welcome ${user.name}`})
       socket.broadcast.to(user.room).emit('Message',{user:'Admin',text:`${user.name} has connected`})
       io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });
    })

    socket.on('sendMessage',(message,callback)=>{
        callback();
        const user=getUser(socket.id);
        io.to(user.room).emit('Message',{user:user.name,text:message});
    })
    socket.on('disconnect',()=>{
        const user=removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('Message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room)});
        }
    })
})

server.listen(5000||process.env.PORT,(req,res)=>{
    console.log('server connected');
})