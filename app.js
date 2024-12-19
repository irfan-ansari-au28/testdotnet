const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
const corsOptions = {
  origin: '*',  // You can replace '*' with specific origins to allow (e.g., 'https://example.com')
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Use CORS middleware
app.use(cors(corsOptions));

// Middleware to set security headers
app.use((req, res, next) => {
  // Strict-Transport-Security (HSTS)
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Content-Security-Policy (CSP)
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none';");
  
  // X-Frame-Options (Prevent clickjacking)
  res.setHeader('X-Frame-Options', 'DENY');
  
  // X-Content-Type-Options (Prevent MIME type sniffing)
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Referrer-Policy (Control Referer header)
  res.setHeader('Referrer-Policy', 'no-referrer');
  
  // Permissions-Policy (Control feature access)
  res.setHeader('Permissions-Policy', 'geolocation=(self), microphone=()');
  
  // Continue to the next middleware/route handler
  next();
});

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World! Your site is secured with security headers and CORS enabled.');
});

// Example of another route
app.post('/data', (req, res) => {
  res.json({ message: 'Data received successfully!' });
});

// Listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
