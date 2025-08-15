// Unified server for Azure deployment
// Serves UI from wwwroot, API from /api

const express = require('express');
const path = require('path');

// Import backend API and mailserver routers
const api = require('./BackEnd/index');

const app = express();
const PORT = process.env.PORT || 3000;

// Mount API and mailserver
app.use('/api', api);

// Serve static files from wwwroot (UI build output)
app.use(express.static(path.join(__dirname, 'wwwroot')));

// Handle 404 for API routes specifically
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    message: `The endpoint ${req.originalUrl} does not exist`,
  });
});

// Handle 404 for non-API routes - serve custom 404 page
app.use((req, res) => {
  if (req.accepts('html')) {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
  } else {
    res.status(404).json({
      error: 'Not Found',
      message: 'The requested resource was not found',
      redirect: 'http://localhost:3000/'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Unified server running on port ${PORT}`);
  console.log(`API available at /api`);
  console.log(`UI served from /`);
});
