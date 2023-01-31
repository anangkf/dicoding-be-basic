const fs = require('fs');

// read file using readFile method
const fileReadCallback = (error, data) =>{
  if(error){
    console.log('Gagal membaca berkas')
    return
  }
  console.log(data)
};

fs.readFile('./filesystem/notes.txt', 'utf-8', fileReadCallback);

// read file using readFileSync method
const data = fs.readFileSync('./filesystem/notes.txt', 'utf-8')
console.log(data)