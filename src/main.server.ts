// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { createServer } from 'http';

import { enableProdMode } from '@angular/core';

import { api } from './api';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

const PORT = process.env.PORT || 4000;

let requestListener = api;

// Start up the Node server
const server = createServer((req, res) => {
  requestListener(req, res);
});

server.listen(PORT, () => {
  console.log(`Server listening -- http://localhost:${PORT}`);
});

if (module.hot) {
  module.hot.accept('./api', () => {
    requestListener = require('./api').api;
  });
}

export default server;
