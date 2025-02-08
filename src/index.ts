import { initializeServer, startServer } from './server';

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

_startServer().catch((err) => {
  console.log(err);
  process.exit(1);
});

async function _startServer() {
  initializeServer();
  startServer();
}
