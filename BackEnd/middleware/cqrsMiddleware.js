const fs = require('fs');
const path = require('path');

const cqrsMiddleware = (req, res, next) => {
  // Determine if the request is a command (write operation) or query (read operation)
  const isCommand = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method);
  const isQuery = req.method === 'GET';
  
  // Log the operation type
  const operationType = isCommand ? 'COMMAND' : isQuery ? 'QUERY' : 'OTHER';
  
  // Create log entry
  const now = new Date();
  const timeString = now.toTimeString().split(' ')[0];
  const logEntry = `[${timeString}] ${operationType} ${req.method} ${req.originalUrl}\n`;
  
  // Write to CQRS log file
  const logFilePath = path.join(__dirname, '..', 'log', 'cqrs.log');
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Failed to write to CQRS log file:', err);
    }
  });
  
  // Add CQRS information to request object for use in controllers
  req.cqrs = {
    operationType,
    isCommand,
    isQuery
  };
  
  next();
};

module.exports = cqrsMiddleware;
