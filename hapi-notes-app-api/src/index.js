/* eslint-disable import/no-extraneous-dependencies */
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const port = 5050;
const host = 'localhost';

const init = async () => {
  const server = Hapi.server({
    port,
    host,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server is running on ${server.info.uri}`);
};

init();
