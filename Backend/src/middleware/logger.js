import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

// Create logs directory if it doesn't exist
const logDirectory = path.join('logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Create separate write streams
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });
const errorLogStream = fs.createWriteStream(path.join(logDirectory, 'error.log'), { flags: 'a' });

// Normal logger for all requests
export const fileLogger = morgan('combined', { stream: accessLogStream });
export const consoleLogger = morgan('dev');

// Custom error logger — logs only 4xx or 5xx
export const errorLogger = morgan('combined', {
  stream: errorLogStream,
  skip: (req, res) => res.statusCode < 400
});
