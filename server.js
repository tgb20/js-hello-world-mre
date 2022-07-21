const MRE = require('@microsoft/mixed-reality-extension-sdk');
const path = require('path');
const App = require('./app');

process.on('uncaughtException', (err) => console.log('uncaughtException', err));
process.on('unhandledRejection', (reason) => console.log('unhandledRejection', reason));

function runApp() {
  const server = new MRE.WebHost({
    baseDir: path.resolve(__dirname, './public'),
  });

  server.adapter.onConnection((context) => new App(context));
}

const delay = 1000;
const argv = process.execArgv.join();
const isDebug = argv.includes('inspect') || argv.includes('debug');

if (isDebug) {
  setTimeout(runApp, delay);
} else {
  runApp();
}
