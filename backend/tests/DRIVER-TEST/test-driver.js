const http = require('http');

const data = JSON.stringify({
  fullName: {
    firstName: 'Dave',
    lastName: 'Miller'
  },
  email: 'dave.miller@example.com',
  password: 'password123',
  vehicleType: {
    color: 'black',
    plate: 'NY-12345',
    capacity: 4,
    vehicleType: 'car'
  }
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/drivers/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('BODY:', body);
    process.exit(res.statusCode === 201 ? 0 : 1);
  });
});

req.on('error', (err) => {
  console.error('Request failed:', err);
  process.exit(1);
});

req.write(data);
req.end();
