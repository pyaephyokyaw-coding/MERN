const fs = require('fs');

const readStream = fs.createReadStream('./docs/cc.txt');
const writeStream = fs.createWriteStream('./docs/writeStream.txt');

// readStream.on('data', function(value){
//     // console.log(value.toString());
//     writeStream.write(value.toString());
// })

readStream.pipe(writeStream);