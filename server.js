const _ = require('lodash');
const http = require('http');
const fs = require('fs');

let randomnum = _.random(99); // Generate a random number between 0 and 99
console.log(randomnum);

const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'text/plain');
    
    // Write the HTML with the random number value
    res.write('Today! Your lucky number is ' + randomnum.toString()); 

    res.end();
});

const port = 9000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
