// Dependecies,
/*
        npm init            --> to initialize our .json
        npm i cors          --> CORS or Cross-Origin Resource Sharing in Node. js is a mechanism by which a front-end client can make requests for resources to an external back-end server.
        npm i nodemon       --> for automatic running of code no need to write "node index.js" everytime.  Must remember to write "start" attribute as "nodemon index.js" in package.json under "scripts" section 
        npm i express       --> installing expressJS
        npm i socket.io     --> for real time communication

*/

const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

// importing our router
const router = require("./router");

const PORT = process.env.PORT || 5000;
const cors = require('cors');

// Preparing socket.io
const {Server} = require("socket.io");
const io = new Server(server);

const {addUser , removeUser , getUser, getUsersInRoom} = require("./users");


io.on('connection', (socket) => {                       // io --> server  socket --> client. Whenever a client joins the server i.e connenction is made,
        console.log("We have a new connection !!");     // this message is printed


        socket.on('join', async ({name , room} , callback) => {          // incase we have an event named 'join' specified in the "Chat" component in client folder (this helps us get the 'name' & 'room' of the current user)
                
               
                const {error , user} = await addUser({ id: socket.id , name , room });         // addUser return either error mesaage or a valid user, so accepting it. and take id, name , room as parameters

                if( error ) return callback(error);             // incase an error found return error message
                

                socket.join(user.room);         // this join() allows user to join a room
                
                // incase no error occured so join user into a room,
                socket.emit('message' , {user: 'admin' , text:`${user.name}, Welcome to the room ${user.room}`});       // this emits a 'message' event which means when a user joins this message is to be displayed to him
                socket.broadcast.to(user.room).emit('message' , {user: 'admin' , text:`${user.name},has joined!`});     // this line broadcast this message to all other clients except the current user

                // it emits an event, 'roomData' ,  basically collecting all the users present in the room
                io.to(user.room).emit('roomData' , {room : user.room , users : getUsersInRoom(user.room)});

                callback();
        })



        socket.on('sendMessage', async(message , callback) => {
                const user = await getUser(socket.id);              // getting the user that sent the message(using async -await since without it "user" is coming undefined)
                
                io.to(user.room).emit('message' , {user: user.name , text:message } );     // emitting an 'message' event to the room dispplaying the current message sent

                callback();
        })


        socket.on('disconnect' , async()=>{          // when any client(socket) disconnects from the server(io) then,
                console.log("User had left !!");// this message is printed

                const user = await removeUser(socket.id);

                if( user ){
                        io.to(user.room).emit('message', {user: 'admin' , text: `${user.name} has left.`})      // displaying a message when user is leaving to other memeber of group

                        // since a user has left so updating our list of users in our room
                        io.to(user.room).emit('roomData' , {room : user.room , users : getUsersInRoom(user.room)});
                }
        })

})

app.use(cors());        // this cors is used since while hosting or else some of the requests/sockets would be ignored while hosting

app.use(router);        // using router as a middleware, "Middlewares" --> are functions that have access to request object(req) , response object(res), and next() to call next middle ware.
//The app.use() function is used to mount/register the specified middleware function(s) at the path that is being specified. 
// here, in router itself "path" and functions is being defined and this router middleware is being registered/mounted here


server.listen(PORT , () => {
        console.log(`Server listening at ${PORT}`)
})