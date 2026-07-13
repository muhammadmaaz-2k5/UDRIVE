require('dotenv').config();
const http = require('http');
const app = require('./app.js');

const server = http.createServer(app);
const port = process.env.PORT || 5000;


server.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
