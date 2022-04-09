/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>{
  console.log('Feathers application started on http://%s:%d', app.get('host'), port)
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)

}
);
