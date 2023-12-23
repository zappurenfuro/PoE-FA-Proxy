const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();

// Enable CORS for all requests
app.use(cors());

// Proxy endpoint
app.use('/api', (req, res) => {
  // Append the rest of the path or query parameters if any
  const apiUrl = 'https://poefa.xyz' + req.url;
  // Options for the proxied request
  const options = {
    url: apiUrl,
    headers: {
      'User-Agent': 'request'
    }
  };

  // Pipe the request from the original API through our server to the client
  request(options).pipe(res);
});

// Root route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Proxy server is running. Use /api to access the proxied API.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
