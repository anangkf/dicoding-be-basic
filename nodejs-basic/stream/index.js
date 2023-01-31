const fs = require('fs');
const path = require('path');

const fileInput = path.resolve(__dirname, 'input.txt')
const fileOutput = path.resolve(__dirname, 'output.txt')

const readableStream = fs.createReadStream(fileInput, {
  highWaterMark: 15
});

const writeableStream = fs.createWriteStream(fileOutput);

readableStream.on('readable', () =>{
  try{
    let text = readableStream.read();
    writeableStream.write(`${text}\n`)
  }catch(error){
    console.error(error);
  }
});


readableStream.on('end', () =>{
  writeableStream.end()
});