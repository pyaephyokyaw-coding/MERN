const http = require('http');

const server = http.createServer((req, res) => {
    if (req) {
        console.log("request is starting: " + req);
    }

    console.log("response is starting: " + res)

    res.setHeader('content-type', 'text/html');
    res.write('<h1>server testing</h1>');
    res.end();
})

server.listen('9000', 'localhost', () => {
    console.log('server is starting!')
})