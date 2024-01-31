const express = require('express');
const helmet = require('helmet');
const crypto = require('crypto');

const app = express();

app.use(express.static('public'));

app.use((req, res, next) => {
        // Generate a new nonce at each request
        res.locals.nonce = crypto.randomBytes(16).toString('base64');
        next();
    });
  
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`]
      },
    },
  }));
  
  app.get('/', (req, res) => {
    res.render('index', { nonce: res.locals.nonce });
  });
  
  app.listen(3000, () => console.log('Server is running on port 3000'));
  