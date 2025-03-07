const fs = require('fs');

const filePath = './docs/cc2.txt';

if (!fs.existsSync(filePath)) {
    console.log('create new file');
    fs.writeFileSync(filePath, '', 'utf8'); // Creates an empty file
}
else{
    fs.unlink(filePath, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            console.log('File deleted.');
        }
    })
}

fs.writeFile('./docs/cc.txt', 'This is new text', (err, data) => {
    if (err) {
        console.log(err.toString());
    }

    console.log("End of Write File.")
}
);

fs.readFile('./docs/cc.txt', (edata, adata) => {
    if (edata) {
        console.log(edata);
    }
    else {
        console.log(adata.toString());
    }

    console.log("End of Read File.");
}
);

console.log("End of code.");
