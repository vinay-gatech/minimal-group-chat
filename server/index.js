const http_lib = require('http')

const http = http_lib.createServer();

const io = require('socket.io')(http,{
    cors: {origin: '*'}
});


// websocket: event based system
io.on('connection', (socket)=>{
    console.log('a user connected');
    
    //listen to any custom event. for eg: event 'message' here
    socket.on('message', (message)=>{
        console.log(message);

        // re-emit the message: broadcast it out to everybody
        // event name: 'message'
        io.emit('message', `${socket.id.substr(0,2)} said ${message}`);
    });
});

http.listen(8080, ()=>console.log('Listening on port 8080'));