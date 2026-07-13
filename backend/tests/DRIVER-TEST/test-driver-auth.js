const http = require('http');

const loginData = JSON.stringify({
  email: 'dave.miller@example.com',
  password: 'password123'
});

// Helper for making requests
function makeRequest(path, method, headers, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000, // Query the default running port
      path: path,
      method: method,
      headers: headers || {}
    };

    if (data) {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body ? JSON.parse(body) : null
        });
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(data);
    }
    req.end();
  });
}

(async () => {
  try {
    console.log('1. Logging in driver...');
    const loginRes = await makeRequest('/api/drivers/login', 'POST', {}, loginData);
    console.log('Login Status:', loginRes.statusCode);
    if (loginRes.statusCode !== 200) {
      throw new Error(`Login failed: ${JSON.stringify(loginRes.body)}`);
    }
    const token = loginRes.body.token;
    console.log('Login Token:', token.substring(0, 20) + '...');

    console.log('\n2. Accessing protected driver profile route...');
    const profileRes = await makeRequest('/api/drivers/profile', 'GET', {
      'Authorization': `Bearer ${token}`
    });
    console.log('Profile Status:', profileRes.statusCode);
    console.log('Profile Body:', JSON.stringify(profileRes.body));
    if (profileRes.statusCode !== 200 || profileRes.body.email !== 'dave.miller@example.com') {
      throw new Error('Profile access failed');
    }

    console.log('\n3. Logging out driver (blacklisting token)...');
    const logoutRes = await makeRequest('/api/drivers/logout', 'GET', {
      'Authorization': `Bearer ${token}`
    });
    console.log('Logout Status:', logoutRes.statusCode);
    console.log('Logout Body:', JSON.stringify(logoutRes.body));
    if (logoutRes.statusCode !== 200) {
      throw new Error('Logout failed');
    }

    console.log('\n4. Attempting to access profile with blacklisted token...');
    const profileAfterLogoutRes = await makeRequest('/api/drivers/profile', 'GET', {
      'Authorization': `Bearer ${token}`
    });
    console.log('Profile After Logout Status (Expected 401):', profileAfterLogoutRes.statusCode);
    console.log('Profile After Logout Body:', JSON.stringify(profileAfterLogoutRes.body));
    
    if (profileAfterLogoutRes.statusCode === 401) {
      console.log('\nAll driver authentication tests passed successfully!');
      process.exit(0);
    } else {
      throw new Error('Blacklisted token was accepted');
    }
  } catch (err) {
    console.error('\nTest failed:', err.message);
    process.exit(1);
  }
})();
