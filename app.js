const express = require('express');
const helmet = require('helmet');
const crypto = require('crypto');
const path = require('path');
const app = express();

app.use(helmet());

app.use((req, res, next) => {
  // Generate a nonce
  const nonce = "Test";

  // Set CSP header
  res.setHeader('Content-Security-Policy', `default-src 'self'; script-src 'strict-dynamic' 'nonce-${nonce}' 'unsafe-inline' http: https:; object-src 'none'`);

  // Add nonce to locals so it can be used in views
  res.locals.nonce = nonce;

  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});