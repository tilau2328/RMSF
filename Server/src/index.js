const server = require('./server');

server.start((err) => {
    if (err) { throw err; }
    console.log('Server Running');
});
