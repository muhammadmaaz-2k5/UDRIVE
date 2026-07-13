const http = require('http');
const app = require('./app.js');

const server = http.createServer(app);
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
