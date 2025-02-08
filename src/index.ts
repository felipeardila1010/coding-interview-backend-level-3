import { initializeServer, startServer } from './server';

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

_startServer();

function _startServer() {
  initializeServer();
  startServer();
}
