// console.log('Halo, kita akan belajar membuat server menggunakan Node.js dan Hapi.js');
const http = require('http');

/**
 * Logika untuk menangani dan menanggapi request dituliskan pada function ini
 * 
 * @param req : object yang berisi informasi terkait request
 * @param res : object yang digunakan untuk menanggapi request(response)
 */
const requestListener = ((req, res) =>{
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Author-Name', 'anangkf');
  
  const { method, url } = req;

  if(url === '/'){
    if(method === 'GET'){
      res.statusCode = 200;
      res.end(JSON.stringify({
        message: "Ini adalah Home page!"
      }));
    }else{
      res.statusCode = 400;
      res.end(JSON.stringify({
        message: `Halaman tidak dapat diakses dengan ${method} request`
      }));
    }
  }else if(url === '/about'){
    if(method === 'GET'){
      res.statusCode = 200;
      res.end(JSON.stringify({
        message: "Halo! Ini adalah halaman about"
      }));
    }else if(method === 'POST'){
      res.statusCode = 200;
      let body = [];
  
      req.on('data', (chunk) =>{
        body.push(chunk);
      })
  
      req.on('end', () =>{
        body = Buffer.concat(body).toString();
        const {name} = JSON.parse(body);
        res.end(JSON.stringify({
          message: `Halo, ${name}! Ini adalah halaman about`
        }));
      })
    }else{
      res.statusCode = 400;
      res.end(JSON.stringify({
        message: `Halaman tidak dapat diakses dengan ${method} request`
      }));
    }
  }else{
    res.statusCode = 404;
    res.end(JSON.stringify({
      message: "Halaman tidak ditemukan!"
    }));
  }
});

const server = http.createServer(requestListener);

const port = 5050;
const host = 'localhost';

server.listen(port, host, () =>{
  console.log(`Server berjalan pada https://${host}:${port}`);
})