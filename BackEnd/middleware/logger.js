const fs = require('fs');
const path = require('path');

const loggerMiddleware = (req, res, next) => {
  const now = new Date();
  const timeString = now.toTimeString().split(' ')[0]; // hh:mm:ss
  const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
  const logEntry = `date-{${timeString}} - ${clientIp} - ${req.method} - ${req.originalUrl}\n`;
  const logFilePath = path.join(__dirname, '..', 'api.log');
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
  next();
};

module.exports = loggerMiddleware;
