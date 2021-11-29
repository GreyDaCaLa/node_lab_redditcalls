const fs = require('fs');
const path = require('path');



const randoArray = [{"chirp1":"chirp"},{"chirp2":"chirp"},{"chirp3":"chirp"},{"chirp4":"chirp"},{"chirp5":"chirp"}];

const writeStream = fs.createWriteStream("./chirps.json");
// console.log(JSON.stringify(randoArray))
writeStream.write(JSON.stringify(randoArray)); // the write method can take a string or a buffer

const readStream = fs.createReadStream("./chirps.json");

readStream.pipe(process.stdout);