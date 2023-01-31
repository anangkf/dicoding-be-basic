const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const port = 5050;
const host = 'localhost';

const init = async () =>{
  const server = Hapi.server({
    port,
    host
  })

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`)
}

init();