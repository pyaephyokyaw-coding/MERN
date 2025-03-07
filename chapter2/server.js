const http = require('http');

const server = http.createServer((req, res) => {
    console.log('request is starting.');
    res.setHeader('content-type', 'text/html');

    res.write('<h1> Hello PPK !</h1>');

    res.end(); 
});

server.listen('9974', 'localhost', () => {
    console.log('server is listening.');
})