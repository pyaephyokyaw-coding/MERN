const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'home.html');
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    res.setHeader('content-type', 'text/html');
    fs.readFile('./home.html', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error');
        } else {
            console.log(filePath);
            res.write(data);
            res.end();
        }
    });
});

const PORT = 9000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
